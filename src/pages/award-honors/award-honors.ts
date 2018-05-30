import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-award-honors',
  templateUrl: 'award-honors.html',
})
export class AwardHonorsPage {
  applicant : FormGroup;

  constructor(public navCtrl: NavController, 
   public formBuilder: FormBuilder) {
    this.applicant = this.formBuilder.group({
      Name: ['', Validators.required],
      Detail : ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwardHonorsPage');
  }

  applicantForm()
  {
    this.navCtrl.push('CertificationAndCoursesPage');
  }
}
