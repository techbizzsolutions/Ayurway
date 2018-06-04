import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';

@Injectable()
export class ImageSelectorProvider {
 
  constructor(public http: HttpClient,
    private camera: Camera,

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
}
