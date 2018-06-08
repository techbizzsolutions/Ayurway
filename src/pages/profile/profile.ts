import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { FileEntry } from '@ionic-native/file';
import { IonicPage, Events, NavController, ToastController, NavParams, ActionSheetController } from 'ionic-angular';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { DomSanitizer } from "@angular/platform-browser";
import { File } from '@ionic-native/file';
import { NgZone } from '@angular/core';
import { HomePage } from '../home/home';
import { ImageSelectorProvider } from '../../providers/image-selector/image-selector';
import { ApiProvider } from '../../providers/api/api';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profiledata:any;
  user: any;
  profilePic: any = 'assets/imgs/ic_profile_dp1.jpg';
  loadProgress: Number = 0;
  showBar: boolean = false;
  fileTransfer: FileTransferObject;
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    private loader: LoaderServiceProvider, 
    private camera: Camera,
    public toastProvider: ToastProvider,
    public ngZone: NgZone,
    public imgselect:ImageSelectorProvider,
    private domSanitizer: DomSanitizer,
    private transfer: FileTransfer,
    private file: File,
    private _toast: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public events: Events, public navParams: NavParams) {
    this.fileTransfer = this.transfer.create();
    this.updateProfile();
    events.subscribe('user:profile', () => {
      console.log('user:profile');
      this.updateProfile();
      this.getProfile();
    });
  }

  updateProfile() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.profilePic = (this.user['img']) ? this.domSanitizer.bypassSecurityTrustResourceUrl(this.user['img']) : "assets/imgs/ic_profile_dp1.jpg";
    console.log(this.user);
  }

  changePic() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.imgselect.selectPhoto().then(image=>{
              console.log('selectPhoto res',image);
              if(image)
              {
                   this.checkPicSize(image);
              }
          }).catch (err=>{
            console.log(err);
          });
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.imgselect.takePhoto().then(image=>{
              console.log('takePhoto res',image);
              if(image)
             {
              this.checkPicSize(image);
            }
          }).catch (err=>{
            console.log(err);
          });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  checkPicSize(imageURI: any) {
    this.loadProgress = 0;
    this.file.resolveLocalFilesystemUrl(imageURI)
      .then(entry => (<FileEntry>entry).file(file => {
        console.log('file', file);
        let bytes = file.size;
        let val;
        if (bytes < 10485760) {
          console.log("Size = " + bytes);
          this.uploadOnServer(imageURI);
        }
        else {
          let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
          let i = Math.floor(Math.log(bytes) / Math.log(1000));
          let val = parseFloat((bytes / Math.pow(1000, i)).toFixed(1)) + ' ' + sizes[i];
          this._toast.create({
            message: "Sorry, Image size should be less than 10MB,Image size is" + val,
            duration: 3000,
            position: 'top'
          })
        }
      }
      ))
      .catch(err => console.log(err));
  }

  uploadOnServer(img: any) {
    this.loader.Show("uploading..");
    console.log("imageFileUri", img);
    let options: FileUploadOptions = {
      fileKey: 'file',
      chunkedMode: false,
      mimeType: "multipart/form-data"
    }
    this.showBar = true;
    this.fileTransfer.upload(img, 'http://agldashboard.adv8.co/service/hrm/insert_image_muthoot', options)
      .then((data) => {
        // success
        console.log("data", data);
        this.loader.Hide();
        this.loadProgress = 100;
        let res = JSON.parse(data.response);
        let user = JSON.parse(localStorage.getItem('user'));
        user.img = img;
        localStorage.setItem('user', JSON.stringify(user));
        this.events.publish('user:loggedIn');
        this._toast.create({
          message: 'Image has been uploaded successfully',
          duration: 3000,
          position: 'top'
        }).present();
        setTimeout(() => {
          this.showBar = false;
        }, 500);

      }, (err) => {
        // error
        this.loader.Hide();
        this.showBar = false;
        console.log("data", err);
        if (err.code != 4) {
          this.profilePic = 'assets/imgs/ic_profile_dp1.jpg';
          this._toast.create({
            message: 'Connection error, please check device is connected to internet',
            duration: 3000,
            position: 'top'
          }).present();
        }
      }).catch((err) => {
        this.loader.Hide();
        this.showBar = false;
        console.log("data", err);
        this.profilePic = 'assets/imgs/ic_profile_dp1.jpg';
        this._toast.create({
          message: err,
          duration: 3000,
          position: 'top'
        }).present();
      });

    this.fileTransfer.onProgress((e) => {
      console.log((e.lengthComputable) ? Math.floor(e.loaded / e.total * 100) : -1);
      this.ngZone.run(() => {
        this.loadProgress = (e.lengthComputable) ? Math.floor(e.loaded / e.total * 100) : -1;
      });
    });

  }

  itemclick(type: any,action:any,item:any) {
    console.log(type  + action + item);
    let rowdate = item;
    rowdate.action = action;
    switch (type) {
      case 'Membership':
        this.navCtrl.push('MembershipPage',rowdate);
        break;
      case 'Experience':
        this.navCtrl.push('ExperiencePage');
        break;
      case 'Education':
        this.navCtrl.push('EducationPage');
        break;
      case 'Awards':
        this.navCtrl.push('AwardHonorsPage');
        break;
      case 'Publication':
        this.navCtrl.push('PublicationsPage');
        break;
      case 'Presentation':
        this.navCtrl.push('PresentationPage');
        break;
      case 'Volunteer':
        this.navCtrl.push('VolunteerExperiencePage');
        break;
      case 'Certification':
        this.navCtrl.push('CertificationAndCoursesPage');
        break;
      case 'CME':
        this.navCtrl.push('ComesPage');
        break;
      case 'Language':
        this.navCtrl.push('LanguagePage');
        break;
      case 'personal':
        this.navCtrl.push('PersonalDetailsPage');
        break;  
      case 'Phone':
        this.navCtrl.push(HomePage);
        break; 
      default:
        break;
    }
  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave");
    this.fileTransfer.abort();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getProfile();
  }

  getProfile()
  {
    this.loader.Show("Loading...");
    this.api.auth('get_profile', {
    }).subscribe(res => {
       console.log('getProfile',res);
       this.loader.Hide();
       if(res.authorization)
       {
          this.profiledata = res;
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
      console.log('getProfile err',err);
    })
  }

}
