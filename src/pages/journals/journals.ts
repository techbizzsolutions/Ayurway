import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-journals',
  templateUrl: 'journals.html',
})
export class JournalsPage {
  rootNavCtrl: NavController;
  items = [];
  speciality:any="";
  journals =[];
  isshow:boolean = true;
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    private loader: LoaderServiceProvider,
    public toastProvider: ToastProvider, public navParams: NavParams) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');
  }

  itemclick(item)
  {
     this.rootNavCtrl.push('JournalDetailsPage',item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JournalsPage');
    this.items = JSON.parse(localStorage.getItem('specialities'));
    this.getNews("");
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getNews(this.speciality);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  select(item)
  {
       console.log(item);
       this.speciality = item.id;
       this.getNews(item.id);
  }

  getNews(id:any)
  {
    this.isshow = true;
    this.api.auth('get_journals', {
      'specialty_id':id
    }).subscribe(res => {
       console.log('get_journals',res);
       this.isshow = false;
       if(res.authorization)
       {
          this.journals = res.journals;
       }
       else{
        this.toastProvider.NotifyWithoutButton({
          message: res.message, 
          duration: 3000,
          position: 'top'
        });
      }
       
    }, err => {
      this.isshow = false;
      console.log('getProfession err',err);
      this.toastProvider.NotifyWithoutButton({
        message: err.message, 
        duration: 3000,
        position: 'top'
      });
    });
  }

}
