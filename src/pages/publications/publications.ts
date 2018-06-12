import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ToastProvider } from '../../providers/toast/toast';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-publications',
  templateUrl: 'publications.html',
})
export class PublicationsPage {

  applicant : FormGroup;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public api: ApiProvider,
    public events: Events,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider, 
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Paper: ['', Validators.required],
        Journal : ['',Validators.required],
        Author : ['',Validators.required],
        link : ['',Validators.required]
            });
  }

  applicantForm()
  {
    this.loader.Show("Loading...");
    this.api.auth('save_publication', {
      'publication_id':(this.navParams.data.action === 'Edit')?this.navParams.data.id:0,
      'paper': this.applicant.value.Paper,
      'link': this.applicant.value.link,
      'author': this.applicant.value.Author,
      'description' : this.applicant.value.Journal
    }).subscribe(res => {
       console.log('save_publication',res);
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
    this.api.auth('get_publication', {
      'publication_id':id
    }).subscribe(res => {
       console.log('getExperience',res);
       this.loader.Hide();
       if(res.authorization)
       {
        this.applicant = this.formBuilder.group({
          Paper: [res.paper, Validators.required],
          Journal : [res.description,Validators.required],
          Author : [res.author,Validators.required],
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
