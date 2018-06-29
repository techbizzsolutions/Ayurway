import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageSelectorProvider } from '../../providers/image-selector/image-selector';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-discuss',
  templateUrl: 'discuss.html',
})
export class DiscussPage {
  rootNavCtrl: NavController;
  region:any
  items:any = [];
  constructor(public navCtrl: NavController,
    public imgselect:ImageSelectorProvider,
    public api: ApiProvider,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider,
    public navParams: NavParams) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');
  }

  itemClick()
  {
    console.log('itemClick DiscussPage');
    this.rootNavCtrl.push('DiscussDetailsPage');
  }

  otherProfile()
  {
     this.rootNavCtrl.push('OtherProfilePage');
  }
  
  shareData()
  {
      this.loader.Show("downloading image...");
     this.imgselect.shareData("testing data for sharing","https://vignette.wikia.nocookie.net/dbxfanon/images/f/fd/Link.png")
     .then(res=>{
      this.loader.Hide();
    }).catch(err=>{
      this.loader.Hide();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussPage',this.navParams.data);
    this.items = JSON.parse(localStorage.getItem('specialities'));
    this.getDiscuss();
  }

  getDiscuss()
  {
    this.loader.Show("Loading...");
    this.api.auth('get_discussions', {
    }).subscribe(res => {
       console.log('get_discussions',res);
       this.loader.Hide();
       if(res.authorization)
       {
          
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
    });
  }

  shareCase()
  {
    this.rootNavCtrl.push('ShareCasePage');
  }
}
