import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-publications',
  templateUrl: 'publications.html',
})
export class PublicationsPage {

  applicant : FormGroup;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Paper: ['', Validators.required],
        Journal : ['',Validators.required],
        Author : ['',Validators.required],
        link : ['',Validators.required]
            });
  }

  applicantForm()
  {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicationsPage');
  }

}
