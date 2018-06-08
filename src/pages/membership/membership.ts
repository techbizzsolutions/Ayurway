import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-membership',
  templateUrl: 'membership.html',
})
export class MembershipPage {

  applicant : FormGroup;
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    public events: Events,
    private loader: LoaderServiceProvider, 
    public formBuilder: FormBuilder,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Name: ['', Validators.required]
      });
  }

  applicantForm()
  {
    this.loader.Show("Loading...");
    this.api.auth('save_membership', {
      'membership_id':(this.navParams.data.action === 'Edit')?this.navParams.data.id:0,
      'membership': this.applicant.value.Name
    }).subscribe(res => {
       console.log('getProfession',res);
       this.loader.Hide();
       if(res.authorization)
       {
          this.events.publish('user:profile');
          this.navCtrl.pop();
       }
    }, err => {
      this.loader.Hide();
      console.log('getProfession err',err);
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembershipPage', this.navParams.data);
     if(this.navParams.data.action === 'Edit')
     {
       this.getMembership(this.navParams.data.id)
     }
     
  }

  getMembership(id)
  {
    this.loader.Show("Loading...");
    this.api.auth('get_membership', {
      'membership_id':id
    }).subscribe(res => {
       console.log('getProfession',res);
       if(res.authorization)
       {
          this.applicant = this.formBuilder.group({
            Name: [res.membership_name, Validators.required]
          });
       }
       this.loader.Hide();
    }, err => {
      this.loader.Hide();
      console.log('getProfession err',err);
    });
  }
}
