import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class ImageSelectorProvider {
 
  constructor(public http: HttpClient,
    private camera: Camera,
    private socialSharing: SocialSharing
  ) {
    console.log('Hello ImageSelectorProvider Provider');
  }

  takePhoto():Promise<any> {
    return this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      quality: 30,
      allowEdit: true,
      saveToPhotoAlbum: true
    }).then(imageData => {
      return imageData;
    }, error => {
      return "";
    }).catch(err =>{
      return "";
    })
  }

  selectPhoto():Promise<any> {
     return this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      allowEdit: true,
      correctOrientation: true,
      quality: 30,
      encodingType: this.camera.EncodingType.JPEG,
    }).then(imageData => {
      return imageData;
    }, error => {
      return "";
    }).catch(err =>{
      return "";
    })
  }

  shareData(msg:any,image:any):Promise<any> 
  {
    // Check if sharing via email is supported
    return this.socialSharing.share(msg, null,image, 'https://play.google.com/store/apps/details?id=com.technotwit.lowprotector').then(() => {
      return true;
    }, error => {
      return false;
    }).catch(err =>{
      return false;
    })
  }
  
  shareApp(msg:any)
  {
    // Check if sharing via email is supported
    this.socialSharing.share(msg, null, null, 'https://play.google.com/store/apps/details?id=com.technotwit.lowprotector').then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });
  }
}
