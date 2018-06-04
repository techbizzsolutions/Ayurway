import { Component,ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-discuss-details',
  templateUrl: 'discuss-details.html',
})
export class DiscussDetailsPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  msgList = [
    {
      "userName":"Luff",
      "userAvatar":"assets/imgs/ic_profile_dp1.jpg",
      "time":1488349800000,
      "message":"A good programmer is someone who always looks both ways before crossing a one-way street. "
    },
    {
      "userName":"Hancock",
      "userAvatar":"assets/imgs/ic_profile_dp1.jpg",
      "time":1491034800000,
      "message":"Don’t worry if it doesn't work right. If everything did, you’d be out of a job."
    },
    {
      "userName":"Luff",
      "userAvatar":"assets/imgs/ic_profile_dp1.jpg",
      "time":1491034920000,
      "message":"Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris."
    }
  ];
  editorMsg = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscussDetailsPage');
  }

  otherProfile()
  {
    this.navCtrl.push('OtherProfilePage');
  }
  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }

  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    let newMsg = {
      userName: "ajay",
      userAvatar: "assets/imgs/ic_profile_dp1.jpg",
      time: Date.now(),
      message: this.editorMsg
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';
    this.focus();
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
