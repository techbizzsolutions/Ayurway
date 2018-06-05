import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  notfound:boolean = false;
  searchQuery: string = '';
  items:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  initializeItems() {
    this.items = [
      {
        'img':'assets/imgs/ic_profile_dp1.jpg',
        'name':'Raj',
        'profession':'Allopathic Doctor',
        'speciality':'Anatomy'
      },
      {
        'img':'assets/imgs/ic_profile_dp1.jpg',
        'name':'Ajay',
        'profession':'Veterinary',
        'speciality':'Biochemistry'
      },
      {
        'img':'assets/imgs/ic_profile_dp1.jpg',
        'name':'Vijay',
        'profession':'Undergraduate Student',
        'speciality':'Anesthsia'
      }
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    this.notfound = false;
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      if(this.items ==0)
      {
        this.notfound = true;
      }
      else{
        this.notfound = false;
      }
    }
  }
}
