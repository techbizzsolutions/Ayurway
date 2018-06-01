import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';

@IonicPage()
@Component({
  selector: 'page-certification-and-courses',
  templateUrl: 'certification-and-courses.html',
})
export class CertificationAndCoursesPage {
  applicant : FormGroup;
  From:any = 'From';
  To:any = 'To';
  subSpeciality = [
    {
      title: 'At persent',
      selected: false
    }];
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public smsServiceProvider: SmsServiceProvider,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Name: ['', Validators.required],
        Institute : ['',Validators.required]
      });
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

  applicantForm()
  {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CertificationAndCoursesPage');
  }

}
