import { Component } from '@angular/core';
import { IonicPage,Events, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';
import { ToastProvider } from '../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-personal-details',
  templateUrl: 'personal-details.html',
})
export class PersonalDetailsPage {

  applicant : FormGroup;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public events: Events,
    public api: ApiProvider,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        First: ['', Validators.required],
        Last : ['',Validators.required],
        Email: ["", Validators.compose([
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ])],
        City : ['',Validators.required],
        Summary:['',Validators.required]
      });
  }

  applicantForm()
  {
     let user = JSON.parse(localStorage.getItem('user')) ;
      console.log(user);
      this.loader.Show("Loading...");
    if(this.navParams.data != 'subspeciality')
    {
      this.api.auth('save_personal_details', {
        "first_name":this.applicant.value.First,
        "last_name":this.applicant.value.Last,
        "email":this.applicant.value.Email,
        "city":this.applicant.value.City,
        "about_doctor":this.applicant.value.Summary
      }).subscribe(res => {
         console.log('save_personal_details',res);
         this.loader.Hide();
         if(res.authorization)
         {
            user.personaldetails = this.applicant.value;
            user.islogin = true;
            localStorage.setItem('user', JSON.stringify(user));
            this.events.publish('user:loggedIn');
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

    }else{
      this.api.auth('save_profile', {
        "profession_id":user.iam.id,
        "speciality_id":user.mainspeciality.id,
        "sub_speciality_id":user.subspeciality,
        "first_name":this.applicant.value.First,
        "last_name":this.applicant.value.Last,
        "email":this.applicant.value.Email,
        "city":this.applicant.value.City,
        "about_doctor":this.applicant.value.Summary
      }).subscribe(res => {
         console.log('getMainspeciality',res);
         this.loader.Hide();
         if(res.authorization)
         {
            user.personaldetails = this.applicant.value;
            user.islogin = true;
            localStorage.setItem('user', JSON.stringify(user));
            this.events.publish('user:loggedIn');
            this.navCtrl.setRoot('TabsHomePage');
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

  getPersonalDetails()
  {
    this.loader.Show("Loading...");
    this.api.auth('get_personal_details', {
   
    }).subscribe(res => {
       console.log('getMainspeciality',res);
       this.loader.Hide();
       if(res.authorization)
       {
        this.applicant = this.formBuilder.group({
          First: [res.first_name, Validators.required],
          Last : [res.last_name,Validators.required],
          Email: [res.email, Validators.compose([
            Validators.required,
            Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
          ])],
          City : [res.city,Validators.required],
          Summary:[res.about_doctor,Validators.required]
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalDetailsPage',this.navParams.data);
    if(this.navParams.data != 'subspeciality')
    {
      this.getPersonalDetails();
    }
  }

}
