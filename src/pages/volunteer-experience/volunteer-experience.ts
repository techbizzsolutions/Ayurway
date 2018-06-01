import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';

@IonicPage()
@Component({
  selector: 'page-volunteer-experience',
  templateUrl: 'volunteer-experience.html',
})
export class VolunteerExperiencePage {
  From:any = 'From';
  To:any = 'To';
  applicant : FormGroup;
  subSpeciality = [
    {
      title: 'I am currently working here',
      selected: false
    }];
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public smsServiceProvider: SmsServiceProvider,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Title: ['', Validators.required],
        Location : ['',Validators.required]
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
    console.log('ionViewDidLoad VolunteerExperiencePage');
  }

}
