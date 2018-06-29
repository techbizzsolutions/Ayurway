import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { ImageSelectorProvider } from '../../providers/image-selector/image-selector';
import { DomSanitizer } from '@angular/platform-browser';
import { File,FileEntry } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { NgZone } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-share-case',
  templateUrl: 'share-case.html',
})
export class ShareCasePage {
  uploadedimageds:any;
  applicant : FormGroup;
  loadProgress: Number = 0;
  showBar: boolean = false;
  fileTransfer: FileTransferObject;
  caseImage:any;
  filename:any;
  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    private file: File,
    public ngZone: NgZone,
    private loader: LoaderServiceProvider,
    private _toast: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public imgselect:ImageSelectorProvider,
    private domSanitizer: DomSanitizer,
    public formBuilder: FormBuilder,
    public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Name: ['', Validators.required]
      });
      this.fileTransfer = this.transfer.create();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareCasePage');
  }

  applicantForm()
  {
    if(!this.caseImage)
    {
      let toast = this._toast.create({
        message: 'Please select image',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    this.uploadOnServer(this.caseImage);
  }

  uploadOnServer(img: any) {
    console.log('img', img);
    this.loader.Show("uploading..");
    let user = JSON.parse(localStorage.getItem('user'));
    let options: FileUploadOptions = {
      fileKey: 'image',
      headers: {},
      chunkedMode: false,
      params:{
        "doctor_id":user.doctor_id,
        "title":"abcd",
        "content": this.applicant.value.Name
      },
      mimeType: "multipart/form-data"
    }
    this.showBar = true;
    this.fileTransfer.upload(img, 'http://www.technotwitsolutions.com/ayurway/api/add_discussion', options)
      .then((data) => {
        // success
        console.log("data", data);
        this.loader.Hide();
        this.loadProgress = 100;
        let res = JSON.parse(data.response);
        this._toast.create({
          message: res.message,
          duration: 3000,
          position: 'top'
        }).present();
        setTimeout(() => {
          this.showBar = false;
        }, 500);
       this.navCtrl.pop();
      }, (err) => {
        // error
        this.loader.Hide();
        this.showBar = false;
        console.log("data", err);
        if (err.code != 4) {
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

  checkPicSize(imageURI: any) {
    this.loader.Show("loading..");
    this.file.resolveLocalFilesystemUrl(imageURI)
      .then(entry => (<FileEntry>entry).file(file => {
        console.log('file', file);
        let bytes = file.size;
        this.loader.Hide();
        if (bytes < 10485760) {
          console.log("Size = " + bytes);
          this.caseImage = imageURI;
          this.filename = file.name;
          this.uploadedimageds = this.domSanitizer.bypassSecurityTrustResourceUrl(imageURI);
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
      .catch(err => 
        {
          this.loader.Hide();
          console.log(err)
        });
  }

  uploadimage() {
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

}
