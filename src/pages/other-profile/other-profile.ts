import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';
import { CallNumber } from '@ionic-native/call-number';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';

@IonicPage()
@Component({
  selector: 'page-other-profile',
  templateUrl: 'other-profile.html',
})
export class OtherProfilePage {
  profilePic: any = 'assets/imgs/ic_profile_dp1.jpg';
  profiledata:any;
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    public msg: SmsServiceProvider,
    public alertCtrl: AlertController,
    private loader: LoaderServiceProvider, 
    private callNumber: CallNumber,
    public toastProvider: ToastProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherProfilePage', this.navParams.data);
    if(this.navParams.data)
    {
      this.getProfile(this.navParams.data.doctor_id)
    }
  }

  follow()
  {
     this.msg.getfollow(this.navParams.data.id).then(res=>{
         console.log('getfollow',res);
          if(res.status == "Success")
          {
            this.toastProvider.NotifyWithoutButton({
              message: res.message, 
              duration: 3000,
              position: 'top'
            });
          }
     })
     .catch(err=>{})  
  }

  call(number)
  {
    let that =this;
    let alert = this.alertCtrl.create({
      subTitle: "Do you want to call ?",
      buttons: [{
        text: 'Ok',
        handler: () => {
          that.callNumber.isCallSupported()
          .then(function (response) {
              if (response == true) {
                that.callNumber.callNumber(number, true)
                .then(res => console.log('Launched dialer!', res))
                .catch(err => console.log('Error launching dialer', err));
              }
              else {
                this.toastProvider.NotifyWithoutButton({
                  message: "Plz Call manually", 
                  duration: 3000,
                  position: 'top'
                });
              }
          });
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
  getProfile(id)
  {
    this.loader.Show("Loading...");
    this.api.add('get_profile', {
      'doctor_id':id
    }).subscribe(res => {
       console.log('getProfile',res);
       this.loader.Hide();
       if(res.authorization)
       {
          this.profiledata = res;
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
      console.log('getProfile err',err);
    })
  }

}
