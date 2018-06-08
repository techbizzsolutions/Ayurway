import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
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
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider,
    private openNativeSettings: OpenNativeSettings,public smsServiceProvider: SmsServiceProvider,public alertCtrl: AlertController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('user')) ;
    console.log('ionViewDidLoad OtpPage',this.navParams.data);
  }

  resendOtp()
  {
    
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
            case 2:
            {
              this.openNativeSettings.open("application").then(res=>{
              })
              .catch(err=>{})
            }
            break;
            case 4:
            {
             
            }
            break;
            default :
            this.navCtrl.setRoot('ServicesPage');
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
          this.navCtrl.setRoot('TabsHomePage');
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

  editnumber()
  {
    this.navCtrl.setRoot(HomePage);
  }
}
