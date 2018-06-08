import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private register : FormGroup;
  user:any;
  constructor(
    public navCtrl: NavController,
    public api: ApiProvider,
    public toastProvider: ToastProvider,
    private openNativeSettings: OpenNativeSettings,
    public alertCtrl: AlertController,
    public smsServiceProvider: SmsServiceProvider,
    private loader: LoaderServiceProvider,
    public formBuilder: FormBuilder) {
      this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);
        if(this.user)
        {
          this.register = this.formBuilder.group({
            Mobile : [this.user.Mobile,Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
          });
        }
        else{
          this.register = this.formBuilder.group({
            Mobile : ["",Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
          });
        }
     
  }

  logForm()
  {
    this.loader.Show("Loading...");
    this.api.add('register', {
      "phone":this.register.value.Mobile
    }).subscribe(res => {
      console.log('getProfession',res);
      this.loader.Hide();
      if(res.authorization)
      {
        this.register.value.doctor_id = res.doctor_id;
        localStorage.setItem('user', JSON.stringify(this.register.value));
        this.smsServiceProvider.sendMessage(this.register.value.Mobile,"Your OTP is " + res.otp).then(res=>{
          if(res)
          {
           this.showAlert("Otp has been sent successfully to " +this.register.value.Mobile, 1); 
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
            this.navCtrl.push('OtpPage','login');
            break;
            case 2:
            {
              this.openNativeSettings.open("application").then(res=>{
              })
              .catch(err=>{})
            }
            break;
            default :
            this.navCtrl.setRoot('OtpPage','login');
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

  login()
  {
    this.navCtrl.setRoot(HomePage);
  }
}

