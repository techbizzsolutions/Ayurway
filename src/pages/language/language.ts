import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ToastProvider } from '../../providers/toast/toast';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-language',
  templateUrl: 'language.html',
})
export class LanguagePage {

  applicant : FormGroup;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public api: ApiProvider,
    public events: Events,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider, 
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Name: ['', Validators.required]
      });
  }

  applicantForm()
  {
    this.loader.Show("Loading...");
    this.api.auth('save_language', {
      'language_id':(this.navParams.data.action === 'Edit')?this.navParams.data.id:0,
      "language": this.applicant.value.Name
    }).subscribe(res => {
       console.log('save_language',res);
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
    this.api.auth('get_language', {
      'language_id':id
    }).subscribe(res => {
       console.log('get_language',res);
       this.loader.Hide();
       if(res.authorization)
       {
        this.applicant = this.formBuilder.group({
          Name: [res.language, Validators.required]
        });
      
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

