import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-share-home',
  templateUrl: 'share-home.html',
})
export class ShareHomePage {

  rootNavCtrl: NavController;
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
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');
  }

  itemClick()
  {
    console.log('itemClick DiscussPage');
    this.rootNavCtrl.push('DiscussDetailsPage');
  }

  otherProfile()
  {
    this.rootNavCtrl.push('OtherProfilePage');
  }
  
  share()
  {
    console.log('share DiscussPage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussPage');
  }

}
