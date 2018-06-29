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
  items = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');
  }

  itemClick()
  {
    console.log('itemClick ShareHomePage');
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
    console.log('ionViewDidLoad ShareHomePage');
    this.items = JSON.parse(localStorage.getItem('specialities'));
  }

}
