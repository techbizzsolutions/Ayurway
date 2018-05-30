import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';

@IonicPage()
@Component({
  selector: 'page-comes',
  templateUrl: 'comes.html',
})
export class ComesPage {
  dobdate:any;
  applicant : FormGroup;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public smsServiceProvider: SmsServiceProvider,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Name: ['', Validators.required],
        Location : ['',Validators.required]
      });
  }

  applicantForm()
  {
    this.navCtrl.push('EducationPage');
  }

  opencal(type)
  {
    this.smsServiceProvider.opencal().then(res =>{
        this.dobdate = res;
     })
     .catch(err=>{
      var date = new Date();
      var res = date.getDate()+"/"+ date.getMonth()+"/"+ date.getFullYear();
      this.dobdate = res;
     });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComesPage');
  }

}
