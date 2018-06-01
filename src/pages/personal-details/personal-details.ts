import { Component } from '@angular/core';
import { IonicPage,Events, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-personal-details',
  templateUrl: 'personal-details.html',
})
export class PersonalDetailsPage {

  applicant : FormGroup;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public events: Events,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        First: ['', Validators.required],
        Last : ['',Validators.required],
        Email: ["", Validators.compose([
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ])],
        City : ['',Validators.required],
        Summary:['',Validators.required]
      });
  }

  applicantForm()
  {
    let user = JSON.parse(localStorage.getItem('user')) ;
    user.personaldetails = this.applicant.value;
    user.islogin = true;
    localStorage.setItem('user', JSON.stringify(user));
    this.events.publish('user:loggedIn');
    this.navCtrl.setRoot('TabsHomePage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalDetailsPage');
  }

}
