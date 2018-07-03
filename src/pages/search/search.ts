import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchQuery: string = '';
  items:any =[];
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider, public navParams: NavParams) {
  }

  profile(item)
  {
    this.navCtrl.push('OtherProfilePage',item);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  search(q: string)
  {
     this.loader.Show("Loading...")
      this.api.auth('search', {
        'search':q
      }).subscribe(res => {
        console.log('search',res);
        this.loader.Hide();
        if(res.authorization)
        {
          this.items = res.search_results;
        }
        else{
          this.toastProvider.NotifyWithoutButton({
            message: res.message, 
            duration: 3000,
            position: 'top'
          });
        }
        
      }, err => {
        this.items =[];
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
