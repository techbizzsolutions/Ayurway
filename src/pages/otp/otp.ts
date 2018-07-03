import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {

  otp:any;
  user:any;
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    public events: Events,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider,
    private openNativeSettings: OpenNativeSettings,public smsServiceProvider: SmsServiceProvider,public alertCtrl: AlertController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('user')) ;
    console.log('ionViewDidLoad OtpPage',this.user);
  }

  resendOtp()
  {
    this.loader.Show("Loading...");
    this.api.add('register', {
      "phone":this.user.Mobile
    }).subscribe(res => {
      console.log('register',res);
      this.loader.Hide();
      if(res.authorization)
      {
        this.smsServiceProvider.sendMessage(this.user.Mobile,"Your OTP is " + res.otp).then(res=>{
          if(res)
          {
           this.showAlert("Otp has been sent successfully to " +this.user.Mobile, 1); 
          }
          else{
           this.showAlert("Please enable sms permission,Goto applications->Choose Law Protectors app ->Permissions-> enable sms", 2);    
          }
                        
         }).catch(res=>{
           console.log("smsServiceProvider catch" +res);
           this.showAlert("Messgae has been failed, please check your message service", 3); 
         })
      }
      else{
        this.toastProvider.NotifyWithoutButton({
          message: res.message, 
          duration: 3000,
          position: 'top'
        });
      }
      
    }, err => {
      this.loader.Hide();
      console.log('getProfession err',err);
    })  
  }

  showAlert(message,bol)
  {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          switch (bol)
          {
            case 1:
            break;
            case 2:
            {
              this.openNativeSettings.open("application").then(res=>{
              })
              .catch(err=>{})
            }
            break;
            case 4:
            break;
            default :
          }
        }
      },
      {
        text: 'Cancle',
        handler: () => {
          // close the sliding item
        }
      }]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  verifyOtp()
  {
    if(this.otp)
    {
      this.loader.Show("Loading...");
      this.api.auth('check_otp', {
      "otp":this.otp
    }).subscribe(res => {
       console.log('logForm',res);
       this.loader.Hide();
       if(res.authorization)
       {
          if(this.navParams.data != "login")
          {
              this.navCtrl.setRoot('ProfessionCategoryPage');
          }
          else{
            if(this.user.res.profile_completed == "yes")
            {
              this.user.islogin = true;
              this.user.personaldetails = {
                 "First":this.user.res.first_name,
                 "Last":this.user.res.last_name
              };
              this.user.iam = {
                "name":this.user.res.profession,
              };
              localStorage.setItem('user', JSON.stringify(this.user));
              this.getMainspeciality();
            }
            else{
              this.navCtrl.setRoot('ProfessionCategoryPage');
            }
            
          }
         
       }
       else{
        this.toastProvider.NotifyWithoutButton({
          message: res.message, 
          duration: 3000,
          position: 'top'
        });
      }
      
    }, err => {
      this.loader.Hide();
      console.log('getProfession err',err);
    });
      
    }
    else{
      this.showAlert("Please enter otp", 4); 
    }
  }

  getMainspeciality()
  {
    this.loader.Show("Loading...");
    this.api.auth('specialities', {
    }).subscribe(res => {
       console.log('getMainspeciality',res);
       this.loader.Hide();
       if(res.authorization)
       {
           localStorage.setItem('specialities', JSON.stringify(res.specialities));
           this.events.publish('user:loggedIn');
           this.navCtrl.setRoot('TabsHomePage');
       }
       else{
        this.toastProvider.NotifyWithoutButton({
          message: res.message, 
          duration: 3000,
          position: 'top'
        });
      }
      
    }, err => {
      this.loader.Hide();
      console.log('getProfession err',err);
    })
  }

  editnumber()
  {
    if(this.navParams.data === "login")
    {
      this.navCtrl.setRoot('LoginPage');
    }
    else{
      this.navCtrl.setRoot(HomePage);
    }
  }
}
