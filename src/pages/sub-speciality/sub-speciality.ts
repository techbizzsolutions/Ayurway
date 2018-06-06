import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-sub-speciality',
  templateUrl: 'sub-speciality.html',
})
export class SubSpecialityPage {
  title:any = "Ayurway";
  subSpeciality = [];
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    private loader: LoaderServiceProvider,
    public navParams: NavParams) {
  }

  done()
  {
    var check = false;
    var arry = [];
    this.subSpeciality.forEach(element => {
        if(element.selected)
        {
          check = true;
          arry.push(element.id);
        }

    });
    let user = JSON.parse(localStorage.getItem('user')) ;
    user.subspeciality = arry;
    localStorage.setItem('user', JSON.stringify(user));
    this.navCtrl.push('PersonalDetailsPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubSpecialityPage');
    this.title = this.navParams.data.name;
    this.getSubspeciality(this.navParams.data.id);
  }
  
  getSubspeciality(Id)
  {
    this.loader.Show("Loading...");
    this.api.auth('sub_specialities', {
      "doctor_id":"2",
      "speciality_id":Id
    }).subscribe(res => {
       console.log('getMainspeciality',res);
       if(res.authorization)
       {
         res.sub_specialities.forEach(element => {
           let item = element;
            item.selected = false;
            console.log('getProfession item',item);
            this.subSpeciality.push(item);
         });
           
       }
       this.loader.Hide();
    }, err => {
      this.loader.Hide();
      console.log('getProfession err',err);
    })
  }

}
