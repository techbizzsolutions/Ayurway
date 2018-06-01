import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-journals',
  templateUrl: 'journals.html',
})
export class JournalsPage {

  items = [
    {
      name:'Allergy & Immunology',
    },
    {
      name:'Anatomy',
    },
    {
      name:'Anesthsia',
    },
    {
      name:'Biochemistry',
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalsPage');
  }

}
