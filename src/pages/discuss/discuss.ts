import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-discuss',
  templateUrl: 'discuss.html',
})
export class DiscussPage {
  region:any;
  tab:any = 'Discus';
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

  share()
  {
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussPage');
  }

}
