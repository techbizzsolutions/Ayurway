import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
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
    console.log('ionViewDidLoad NewsPage');
  }

}
