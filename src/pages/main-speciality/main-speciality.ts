import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-main-speciality',
  templateUrl: 'main-speciality.html',
})
export class MainSpecialityPage {
  title:any = "Ayurway";
  searchQuery: string = '';
  items:any;
  Mainitems:any;
  noresult:boolean = false;
  constructor(public navCtrl: NavController, 
    public api: ApiProvider,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider,
    public navParams: NavParams) {
  }

  initializeItems() {
    this.items = this.Mainitems;
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
    user.mainspeciality = item;
    localStorage.setItem('user', JSON.stringify(user));
    this.navCtrl.push('SubSpecialityPage',item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainSpecialityPage',this.navParams.data);
    this.title = this.navParams.data.name;
    this.getMainspeciality();
  }

  getMainspeciality()
  {
    this.loader.Show("Loading...");
    this.api.auth('specialities', {
    }).subscribe(res => {
       console.log('getMainspeciality',res);
       this.loader.Hide();
       if(res.authorization)
       {
           this.items = res.specialities;
           this.Mainitems = res.specialities;
           localStorage.setItem('specialities', JSON.stringify(res.specialities));
       }
       else{
        this.toastProvider.NotifyWithoutButton({
          message: res.message, 
          duration: 3000,
          position: 'top'
        });
      }
      
    }, err => {
      this.loader.Hide();
      console.log('getProfession err',err);
    })
  }
  
}
