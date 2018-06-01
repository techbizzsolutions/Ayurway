import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {

  applicant : FormGroup;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Name: ['', Validators.required]
      });
  }

  applicantForm()
  {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanguagePage');
  }

}
