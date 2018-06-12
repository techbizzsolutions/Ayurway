import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SmsServiceProvider } from '../../providers/sms-service/sms-service';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ToastProvider } from '../../providers/toast/toast';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-certification-and-courses',
  templateUrl: 'certification-and-courses.html',
})
export class CertificationAndCoursesPage {
  applicant : FormGroup;
  ispersent:boolean = false;
  From:any = 'From';
  To:any = 'To';
  subSpeciality = [
    {
      title: 'At persent',
      selected: false
    }];
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    public events: Events,
    public toastProvider: ToastProvider,
    private loader: LoaderServiceProvider, 
    public formBuilder: FormBuilder,
    public smsServiceProvider: SmsServiceProvider,
     public navParams: NavParams) {
      this.applicant = this.formBuilder.group({
        Name: ['', Validators.required],
        Institute : ['',Validators.required]
      });
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

  applicantForm()
  {
    this.loader.Show("Loading...");
    this.api.auth('save_certifications', {
      'certifications_id':(this.navParams.data.action === 'Edit')?this.navParams.data.id:0,
      'institute': this.applicant.value.Institute,
      'title' : this.applicant.value.Name,
      'date_from' : this.From,
      'date_to' : (!this.ispersent)?this.To:"",
      'is_currently' : (this.ispersent)?1:0
    }).subscribe(res => {
       console.log('save_certifications',res);
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
    this.api.auth('get_certification', {
      'certification_id':id
    }).subscribe(res => {
       console.log('get_certifications',res);
       this.loader.Hide();
       if(res.authorization)
       {
        this.applicant = this.formBuilder.group({
          Name: [res.title, Validators.required],
          Institute : [res.institute,Validators.required]
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
