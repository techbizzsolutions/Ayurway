import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-main-speciality',
  templateUrl: 'main-speciality.html',
})
export class MainSpecialityPage {
  title:any = "Ayurway";
  searchQuery: string = '';
  items:any;
  noresult:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }

  
  initializeItems() {
    this.items = [
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
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      if(this.items.length == 0)
      {
        this.noresult = true;
      }
      else{
        this.noresult = false;
      }
    }
  }

  itemclick(item:any)
  {
    console.log(item);
    let user = JSON.parse(localStorage.getItem('user')) ;
    user.mainspeciality = item.name;
    localStorage.setItem('user', JSON.stringify(user));
    this.navCtrl.push('SubSpecialityPage',item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainSpecialityPage',this.navParams.data);
    this.title = this.navParams.data.name;
  }

}
