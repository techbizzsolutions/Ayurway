import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

  applicant : FormGroup;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Presentation: ['', Validators.required],
        Detail : ['',Validators.required],
        link : ['',Validators.required]
      });
  }

  applicantForm()
  {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresentationPage');
  }

}
