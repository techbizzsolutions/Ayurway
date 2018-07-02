import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastProvider } from '../../providers/toast/toast';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-new-details',
  templateUrl: 'new-details.html',
})
export class NewDetailsPage {
  news:any;
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    private loader: LoaderServiceProvider,
    public toastProvider: ToastProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewDetailsPage',this.navParams.data);
    this.getNews(this.navParams.data.id);
  }

  getNews(id:any)
  {
    this.loader.Show("Loading...");
    this.api.auth('news_detail', {
      "news_id":id
   }).subscribe(res => {
       console.log('news_detail',res);
       this.loader.Hide();
       if(res.authorization)
       {
          this.news = res;
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
      this.toastProvider.NotifyWithoutButton({
        message: err.message, 
        duration: 3000,
        position: 'top'
      });
    });
  }

}
