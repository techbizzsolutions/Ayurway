import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {
  rootNavCtrl: NavController;
  items = [];
  speciality:any="";
  jobs = [];
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    private loader: LoaderServiceProvider,
    public toastProvider: ToastProvider, public navParams: NavParams) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');
  }

  itemclick(item)
  {
    this.rootNavCtrl.push('NewDetailsPage',item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
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

  apply(item)
  {
    this.loader.Show("Loading...");
    this.api.auth('apply_job', {
      'job_id':item.id
    }).subscribe(res => {
       console.log('apply_job',res);
       this.loader.Hide();
       if(res.authorization)
       {
        this.toastProvider.NotifyWithoutButton({
          message: res.message, 
          duration: 3000,
          position: 'top'
        });
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
  getNews(id:any)
  {
    this.api.auth('get_jobs', {
      'specialty_id':id
    }).subscribe(res => {
       console.log('get_jobs',res);
       if(res.authorization)
       {
          this.jobs = res.jobs;
       }
       else{
        this.toastProvider.NotifyWithoutButton({
          message: res.message, 
          duration: 3000,
          position: 'top'
        });
      }
       
    }, err => {
      console.log('getProfession err',err);
      this.toastProvider.NotifyWithoutButton({
        message: err.message, 
        duration: 3000,
        position: 'top'
      });
    });
  }

}
