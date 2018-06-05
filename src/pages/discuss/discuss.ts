import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageSelectorProvider } from '../../providers/image-selector/image-selector';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';

@IonicPage()
@Component({
  selector: 'page-discuss',
  templateUrl: 'discuss.html',
})
export class DiscussPage {
  rootNavCtrl: NavController;
  region:any
  tab:any = 'Discus';
  items = [
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
  constructor(public navCtrl: NavController,
    public imgselect:ImageSelectorProvider,
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
    console.log('ionViewDidLoad DiscussPage');
  }

  shareCase()
  {
    this.rootNavCtrl.push('ShareCasePage');
  }
}
