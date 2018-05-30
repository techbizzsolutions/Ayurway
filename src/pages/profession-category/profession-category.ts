import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profession-category',
  templateUrl: 'profession-category.html',
})
export class ProfessionCategoryPage {

  iam:any = [
    {
      name:'Allopathic Doctor',
    },
    {
      name:'Ayush/Alternative Medicine',
    },
    {
      name:'Veterinary',
    },
    {
      name:'Undergraduate Student',
    },
    {
      name:'Paramedic',
    }]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  itemclick(item:any)
  {
    console.log(item);
    this.navCtrl.push('MainSpecialityPage',item);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessionCategoryPage');
  }

}
