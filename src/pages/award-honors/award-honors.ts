import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ToastProvider } from '../../providers/toast/toast';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-award-honors',
  templateUrl: 'award-honors.html',
})
export class AwardHonorsPage {
  applicant : FormGroup;

  constructor(public navCtrl: NavController, 
    public api: ApiProvider,
    public events: Events,
    public navParams: NavParams,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider, 
   public formBuilder: FormBuilder) {
    this.applicant = this.formBuilder.group({
      Name: ['', Validators.required],
      Detail : ['',Validators.required]
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
    this.api.auth('get_award', {
      'award_id':id
    }).subscribe(res => {
       console.log('getExperience',res);
       this.loader.Hide();
       if(res.authorization)
       {
         this.applicant = this.formBuilder.group({
          Name: [res.award, Validators.required],
          Detail : [res.description,Validators.required]
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
  applicantForm()
  {
    this.loader.Show("Loading...");
    this.api.auth('save_award', {
      'award_id':(this.navParams.data.action === 'Edit')?this.navParams.data.id:0,
      'award': this.applicant.value.Name,
      'description' : this.applicant.value.Detail
    }).subscribe(res => {
       console.log('save_award',res);
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
}
