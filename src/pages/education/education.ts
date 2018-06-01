import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';

@IonicPage()
@Component({
  selector: 'page-education',
  templateUrl: 'education.html',
})
export class EducationPage {
  applicant : FormGroup;
  From:any = 'From';
  To:any = 'To';
  subSpeciality = [
    {
      title: 'I am currently studying here',
      selected: false
    }];
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public smsServiceProvider: SmsServiceProvider,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        institute: ['', Validators.required],
        degree : ['',Validators.required],
        city : ['',Validators.required],
        country : ['',Validators.required]
      });
  }

  applicantForm()
  {
    this.navCtrl.pop();
  }

  opencal(type)
  {
    this.smsServiceProvider.opencal().then(res =>{
        if(type == 'From')
        {
          this.From = 'From: ' + res;
        }
        else{
          this.To = 'To: '+ res;
        }
     })
     .catch(err=>{
      var date = new Date();
      var res = date.getDate()+"/"+ date.getMonth()+"/"+ date.getFullYear();
        if(type == 'From')
        {
          this.From = 'From: ' + res;
        }
        else{
          this.To = 'To: '+ res;
        }
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EducationPage');
  }

}
