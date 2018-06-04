import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { ImageSelectorProvider } from '../../providers/image-selector/image-selector';
import { DomSanitizer } from '@angular/platform-browser';
import { File,FileEntry } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';

@IonicPage()
@Component({
  selector: 'page-share-case',
  templateUrl: 'share-case.html',
})
export class ShareCasePage {
  uploadedimageds:any;
  applicant : FormGroup;
  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    private file: File,
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareCasePage');
  }

  applicantForm()
  {
    this.navCtrl.pop();
  }
  uploadOnServer(img: any) {
    console.log('img', img);
    this.loader.Show("uploading..");
    this.uploadedimageds = this.domSanitizer.bypassSecurityTrustResourceUrl(img);
    this.loader.Hide();
  }

  checkPicSize(imageURI: any) {
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
