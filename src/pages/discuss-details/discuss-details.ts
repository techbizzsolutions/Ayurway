import { Component,ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ToastProvider } from '../../providers/toast/toast';
import { ApiProvider } from '../../providers/api/api';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { ImageSelectorProvider } from '../../providers/image-selector/image-selector';

@IonicPage()
@Component({
  selector: 'page-discuss-details',
  templateUrl: 'discuss-details.html',
})
export class DiscussDetailsPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  discuss:any;
  msgList = [];
  editorMsg = '';
  user:any;
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    public toastProvider: ToastProvider,
    public msg: SmsServiceProvider,
    public imgselect:ImageSelectorProvider,
    private loader: LoaderServiceProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussDetailsPage',this.navParams.data);
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getDiscuss(this.navParams.data.id)
  }

  getDiscuss(id:any)
  {
    this.loader.Show("Loading...");
    this.api.auth('discussion_detail', {
      'discussion_id':id
    }).subscribe(res => {
       console.log('discussion_detail',res);
       this.loader.Hide();
       if(res.authorization)
       {
          this.discuss = res;
          this.msgList = res.answers;
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
            this.discuss.is_followed = "yes";
          }
     })
     .catch(err=>{})  
  }

  otherProfile()
  {
    this.navCtrl.push('OtherProfilePage');
  }

  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }

  bookmark(item,index)
  {
    this.msg.getshare(item.discussion_id).then(res=>{
      console.log('getshare',res);
      if(res && res.status ==="Success")
        {
         this.toastProvider.NotifyWithoutButton({
           message: "Bookmark has been added successfully", 
           duration: 3000,
           position: 'top'
         });
         this.discuss[index].shares = parseInt(this.discuss[index].shares) + 1;
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

  like(item)
  {
    console.log(item);
     this.msg.getlike(item.discussion_id).then(res=>{
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
          this.discuss.likes = parseInt(this.discuss.likes) + 1;
        }
     })
     .catch(err=>{})
  }
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    this.loader.Show("Loading...");
    this.api.auth('add_answer', {
      "discussion_id":this.navParams.data.id,
      "answer":this.editorMsg.trim()
    }).subscribe(res => {
       console.log('add_answer',res);
       this.loader.Hide();
       if(res.authorization)
       {
              // Mock message
          let newMsg =
          {
            "answer_doctor_name":this.user.personaldetails.First + " " + this.user.personaldetails.Last,
            "answer_doctor_image":(this.user['img']) ? this.user['img']: "assets/imgs/ic_profile_dp1.jpg",
            "answer_date":Date.now(),
            "answer":this.editorMsg.trim()
          };

          this.pushNewMsg(newMsg);
          this.editorMsg = '';
          this.focus();
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

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg) {
      this.msgList.push(msg);
      this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }
}
