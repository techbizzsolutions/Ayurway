import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-profession-category',
  templateUrl: 'profession-category.html',
})
export class ProfessionCategoryPage {
  iam:any = [];
  constructor(public navCtrl: NavController,
     public api: ApiProvider,
     public toastProvider: ToastProvider,
     private loader: LoaderServiceProvider,
     public navParams: NavParams) {
  }

  itemclick(item:any)
  {
    console.log(item);
    let user = JSON.parse(localStorage.getItem('user')) ;
    user.iam = item;
    localStorage.setItem('user', JSON.stringify(user));
    this.navCtrl.push('MainSpecialityPage',item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessionCategoryPage');
    this.getProfession();
  }

  getProfession()
  {
    this.loader.Show("Loading...");
    this.api.auth('professions', {
    }).subscribe(res => {
       console.log('getProfession',res);
       this.loader.Hide();
       if(res.authorization)
       {
           this.iam = res.professions;
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
