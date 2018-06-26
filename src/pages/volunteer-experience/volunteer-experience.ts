import { Component } from '@angular/core';
import { IonicPage, NavController,Events, NavParams,ActionSheetController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { ApiProvider } from '../../providers/api/api';
import { ToastProvider } from '../../providers/toast/toast';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';

@IonicPage()
@Component({
  selector: 'page-volunteer-experience',
  templateUrl: 'volunteer-experience.html',
})
export class VolunteerExperiencePage {
  From:any = 'From';
  To:any = 'To';
  applicant : FormGroup;
  ispersent:boolean = false;
  subSpeciality = [
    {
      title: 'I am currently working here',
      selected: false
    }];
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    public events: Events,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider, 
    public formBuilder: FormBuilder,
    public actionSheetCtrl: ActionSheetController,
    public smsServiceProvider: SmsServiceProvider,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Title: ['', Validators.required],
        Location : ['',Validators.required]
      });
  }

  opencal(type)
  {
    if(type == 'From')
    {
      this.smsServiceProvider.opencal().then(res =>{
        this.From =  res;
     })
     .catch(err=>{
      var date = new Date();
      var res =  date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
        this.From =  res;
     });
    }
    else{
        if(!this.ispersent)
        {
          this.smsServiceProvider.opencal().then(res =>{
            this.To =  res;
         })
         .catch(err=>{
          var date = new Date();
          var res =  date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
          this.To = res;
         });
        }
        else{
          this.toastProvider.NotifyWithoutButton({
            message: "You are currenty working here", 
            duration: 3000,
            position: 'top'
          });
        }
    }
    
  }

  selectuser(item)
  {
     console.log(item);
     if(item)
     {
       this.To= 'To';
       this.ispersent = true;
     }
     else{
      this.ispersent = false;
     }
  }

  applicantForm()
  {
    this.loader.Show("Loading...");
    this.api.auth('save_volunteer_exp', {
      'volunteer_exp_id':(this.navParams.data.action === 'Edit')?this.navParams.data.id:0,
      "title":this.applicant.value.Title,
      "location":this.applicant.value.Location,
      "date_from":this.From,
      "date_to":(!this.ispersent)?this.To:"",
      'is_currently' : (this.ispersent)?1:0
    }).subscribe(res => {
       console.log('save_volunteer_exp',res);
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
    console.log('ionViewDidLoad getExperience', this.navParams.data);
    if(this.navParams.data.action === 'Edit')
    {
      this.getExperience(this.navParams.data.id)
    }
  }

  getExperience(id)
  {
    this.loader.Show("Loading...");
    this.api.auth('get_volunteer_exp', {
      'volunteer_exp_id':id
    }).subscribe(res => {
       console.log('get_volunteer_exp',res);
       this.loader.Hide();
       if(res.authorization)
       {
        this.applicant = this.formBuilder.group({
          Title: [res.title, Validators.required],
          Location : [res.location,Validators.required]
        });
        this.From = res.date_from;
        if(res.is_currently == '1')
        {
          this.subSpeciality[0].selected = true;
          this.ispersent = true;
        }
        else{
          this.To = res.date_to;
        }
      
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
