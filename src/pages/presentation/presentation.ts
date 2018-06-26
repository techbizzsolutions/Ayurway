import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ToastProvider } from '../../providers/toast/toast';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

  applicant : FormGroup;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public api: ApiProvider,
    public events: Events,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider, 
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Presentation: ['', Validators.required],
        Detail : ['',Validators.required],
        link : ['',Validators.required]
      });
  }

  applicantForm()
  {
    this.loader.Show("Loading...");
    this.api.auth('save_presentation', {
      'presentation_id':(this.navParams.data.action === 'Edit')?this.navParams.data.id:0,
      "title":this.applicant.value.Presentation,
      "description":this.applicant.value.Detail,
      "link":this.applicant.value.link
    }).subscribe(res => {
       console.log('save_presentation',res);
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
    this.api.auth('get_presentation', {
      'presentation_id':id
    }).subscribe(res => {
       console.log('get_presentation',res);
       this.loader.Hide();
       if(res.authorization)
       {
        this.applicant = this.formBuilder.group({
          Presentation: [res.title, Validators.required],
          Detail : [res.description,Validators.required],
          link : [res.link,Validators.required]
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
