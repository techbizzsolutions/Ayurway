import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        First: ['', Validators.required],
        Last : ['',Validators.required],
        City : ['',Validators.required]
      });
  }

  applicantForm()
  {
    this.navCtrl.push('ComesPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalDetailsPage');
  }

}
