import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sub-speciality',
  templateUrl: 'sub-speciality.html',
})
export class SubSpecialityPage {
  title:any = "Ayurway";
  subSpeciality = [
    {
      title: 'Asthma & Allergic Conditions',
      selected: false
    },
    {
      title: 'Clinical & Laboratory Immunology',
      selected: false
    },
    {
      title: 'General & Allergy & Immunology',
      selected: false
    }];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  done()
  {
    this.navCtrl.push('AwardHonorsPage');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubSpecialityPage');
    this.title = this.navParams.data.name;
  }

}
