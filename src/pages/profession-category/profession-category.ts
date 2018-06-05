import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

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
  constructor(public navCtrl: NavController,
     public api: ApiProvider,
     public navParams: NavParams) {
  }

  itemclick(item:any)
  {
    console.log(item);
    let user = JSON.parse(localStorage.getItem('user')) ;
    user.iam = item.name;
    localStorage.setItem('user', JSON.stringify(user));
    this.navCtrl.push('MainSpecialityPage',item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessionCategoryPage');
    this.getProfession();
  }

  getProfession()
  {
    this.api.auth('professions', {
      "doctor_id":"2"
    }).subscribe(res => {
       console.log('getProfession',res);
    }, err => {
      console.log('getProfession err',err);
    })
  }
}
