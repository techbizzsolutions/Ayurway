import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageSelectorProvider } from '../../providers/image-selector/image-selector';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';
import { ToastProvider } from '../../providers/toast/toast';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';

@IonicPage()
@Component({
  selector: 'page-discuss',
  templateUrl: 'discuss.html',
})
export class DiscussPage {
  rootNavCtrl: NavController;
  region:any
  items:any = [];
  discusses:any = [];
  isshow:boolean = true;
  speciality:any = "";
  constructor(public navCtrl: NavController,
    public imgselect:ImageSelectorProvider,
    public api: ApiProvider,
    public toastProvider: ToastProvider,
    public msg: SmsServiceProvider,
    private loader: LoaderServiceProvider,
    public navParams: NavParams) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');
  }

  follow(item)
  {
    console.log(item);
     this.msg.getfollow(item.id).then(res=>{
         console.log('getfollow',res);
          if(res.status == "Success")
          {
            this.toastProvider.NotifyWithoutButton({
              message: res.message, 
              duration: 3000,
              position: 'top'
            });
            this.getDiscuss(this.speciality);
          }
     })
     .catch(err=>{})  
  }

  itemClick(item)
  {
    console.log('itemClick DiscussPage');
    this.rootNavCtrl.push('DiscussDetailsPage',item);
  }

  otherProfile(item)
  {
     this.rootNavCtrl.push('OtherProfilePage',item);
  }
  
  bookmark(item,index)
  {
    this.msg.getshare(item.id).then(res=>{
      console.log('getshare',res);
      if(res && res.status ==="Success")
        {
         this.toastProvider.NotifyWithoutButton({
           message: "Bookmark has been added successfully", 
           duration: 3000,
           position: 'top'
         });
         this.discusses[index].shares = parseInt(this.discusses[index].shares) + 1;
        }
      })
      .catch(err=>{})
  }
  shareData(item)
  {
      this.loader.Show("downloading image...");
     this.imgselect.shareData(item.content,item.image)
     .then(res=>{
      this.loader.Hide();
    }).catch(err=>{
      this.loader.Hide();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussPage',this.navParams.data);
    this.items = JSON.parse(localStorage.getItem('specialities'));
    this.getDiscuss("");
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getDiscuss(this.speciality);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  select(item)
  {
       console.log(item);
       this.speciality = item.id;
       this.getDiscuss(item.id);
  }

  like(item,index)
  {
    console.log(item);
     this.msg.getlike(item.id).then(res=>{
         console.log('like',res);
         if(res && res.message ==="You already like this discussion")
         {
          this.toastProvider.NotifyWithoutButton({
            message: res.message, 
            duration: 3000,
            position: 'top'
          });
         }
         else{
          this.discusses[index].likes = parseInt(this.discusses[index].likes) + 1;
         }
     })
     .catch(err=>{})
  }

  getDiscuss(id:any)
  {
    this.isshow = true;
    this.api.auth('get_discussions', {
      'specialty_id':id
    }).subscribe(res => {
      this.isshow = false;
       console.log('get_discussions',res);
       if(res.authorization)
       {
          this.discusses = res.discussions;
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

  shareCase()
  {
    this.rootNavCtrl.push('ShareCasePage');
  }
}
