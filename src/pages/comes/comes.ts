import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ToastProvider } from '../../providers/toast/toast';
import { ApiProvider } from '../../providers/api/api';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';

@IonicPage()
@Component({
  selector: 'page-comes',
  templateUrl: 'comes.html',
})
export class ComesPage {
  dobdate:any;
  applicant : FormGroup;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public api: ApiProvider,
    public events: Events,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider, 
    public smsServiceProvider: SmsServiceProvider,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Name: ['', Validators.required],
        Location : ['',Validators.required]
      });
  }

  opencal()
  {
    this.smsServiceProvider.opencal().then(res =>{
        this.dobdate = res;
     })
     .catch(err=>{
      var date = new Date();
      var res = date.getDate()+"/"+ date.getMonth()+"/"+ date.getFullYear();
      this.dobdate = res;
     });
  }

  applicantForm()
  {
    this.loader.Show("Loading...");
    this.api.auth('save_cmes', {
      "cmes_id":(this.navParams.data.action === 'Edit')?this.navParams.data.id:0,
      "name":this.applicant.value.Name,
      "location":this.applicant.value.Location,
      "date_attended":this.dobdate
    }).subscribe(res => {
       console.log('save_cmes',res);
       this.loader.Hide();
       if(res.authorization)
       {
          this.events.publish('user:profile');
          this.navCtrl.pop();
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
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad getEducation', this.navParams.data);
    if(this.navParams.data.action === 'Edit')
    {
      this.getEducation(this.navParams.data.id)
    }
 }
  getEducation(id)
  {
    this.loader.Show("Loading...");
    this.api.auth('get_cmes', {
      'cmes_id':id
    }).subscribe(res => {
       console.log('get_cmes',res);
       this.loader.Hide();
       if(res.authorization)
       {
        this.applicant = this.formBuilder.group({
          Name: [res.name, Validators.required],
          Location : [res.location,Validators.required]
        });
        this.dobdate = res.date_attended;
      
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
    });
  }

}
