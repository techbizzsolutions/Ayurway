import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SMS } from '@ionic-native/sms';
import { DatePicker } from '@ionic-native/date-picker';
import { LoaderServiceProvider } from '../loader-service/loader-service';
import { ToastProvider } from '../toast/toast';
import { ApiProvider } from '../api/api';

@Injectable()
export class SmsServiceProvider {
  constructor(public http: HttpClient,
    private datePicker: DatePicker,
    public api: ApiProvider,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider,
    private sms: SMS) {
    console.log('Hello SmsServiceProvider Provider');
}

getlike(id:any): Promise<any>
  {
    return new Promise((resolve, reject) => {
    this.loader.Show("Loading...");
     this.api.auth('like_discussion', {
      'discussion_id':id
    }).subscribe(res => {
       console.log('like_discussion',res);
       this.loader.Hide();
       if(res.authorization)
       {
         resolve(res);
       }
       else{
        this.toastProvider.NotifyWithoutButton({
          message: res.message, 
          duration: 3000,
          position: 'top'
        });
        reject({});
      }
       
    }, err => {
      this.loader.Hide();
      console.log('getProfession err',err);
      this.toastProvider.NotifyWithoutButton({
        message: err.message, 
        duration: 3000,
        position: 'top'
      });
      reject({});
     });
    })
  }

  
getshare(id:any): Promise<any>
{
  return new Promise((resolve, reject) => {
  this.loader.Show("Loading...");
   this.api.auth('share_discussion', {
    'discussion_id':id
  }).subscribe(res => {
     console.log('share_discussion',res);
     this.loader.Hide();
     if(res.authorization)
     {
       resolve(res);
     }
     else{
      this.toastProvider.NotifyWithoutButton({
        message: res.message, 
        duration: 3000,
        position: 'top'
      });
      reject({});
    }
     
  }, err => {
    this.loader.Hide();
    console.log('getProfession err',err);
    this.toastProvider.NotifyWithoutButton({
      message: err.message, 
      duration: 3000,
      position: 'top'
    });
    reject({});
   });
  })
}

opencal():Promise<any>
  {
     return this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        console.log('Got date: ', date)
        let mnth = date.getMonth() + 1;
        return date.getFullYear()+"-"+ mnth +"-"+date.getDate();
      },
      err => 
      {
        console.log('Error occurred while getting date: ', err);
        var date = new Date();
        let mnth = date.getMonth() + 1;
        return date.getFullYear()+"-"+ mnth +"-"+date.getDate();
      })
      .catch(err=>{
        var date = new Date();
        let mnth = date.getMonth() + 1;
        return date.getFullYear()+"-"+ mnth +"-"+date.getDate();
      });
  }

sendMessage(number:any, msg): Promise<any>
  {
    return new Promise((resolve, reject) => {
      this.sms.send(number, msg).then((result) => {
              resolve(true);
            }, (error) => {
              console.log("sms send" , error);
                this.sms.hasPermission().then(res=>{
                    console.log(number + "sms hasPermission" , msg);
                    if(res)
                    {
                      reject(false);
                    }
                    else{
                      console.log("sms else");
                      resolve(false);
                    }       
                  })
                  .catch(err=>{
                    console.log("sms hasPermission else");
                    reject(false);
                  })
            });
      
    });   
  }

  sendMessageTouser(msg): Promise<any>
  {
    let user = JSON.parse(localStorage.getItem('user'));
    let number = "9158622555";
    if(user.region == "Pune")
    {
      number = "9158622555";
    }
    else{
      number = "9158277666";
    }
    return new Promise((resolve, reject) => {
      this.sms.send(number, msg).then((result) => {
              resolve(true);
            }, (error) => {
              console.log("sms send" , error);
                this.sms.hasPermission().then(res=>{
                    console.log(number + "sms hasPermission" , msg);
                    if(res)
                    {
                      reject(false);
                    }
                    else{
                      console.log("sms else");
                      resolve(false);
                    }       
                  })
                  .catch(err=>{
                    console.log("sms hasPermission else");
                    reject(false);
                  })
            });
      });   
  }
}
