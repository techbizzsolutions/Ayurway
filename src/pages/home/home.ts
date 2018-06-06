import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private register : FormGroup;
  user:any;
  constructor(
    public navCtrl: NavController,
    public api: ApiProvider,
    private loader: LoaderServiceProvider,
    public formBuilder: FormBuilder) {
      this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);
        if(this.user)
        {
          this.register = this.formBuilder.group({
            Mobile : [this.user.Mobile,Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
          });
        }
        else{
          this.register = this.formBuilder.group({
            Mobile : ["",Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
          });
        }
     
  }

  logForm()
  {
    console.log('click');
        localStorage.setItem('user', JSON.stringify(this.register.value));
        this.navCtrl.push('OtpPage','register');
      // this.loader.Show("Loading...");
      // this.api.auth('register', {
      //   "phone":this.register.value.Mobile
      // }).subscribe(res => {
      //   console.log('getProfession',res);
      //   if(res.authorization)
      //   {
           
      //   }
      //   this.loader.Hide();
      // }, err => {
      //   this.loader.Hide();
      //   console.log('getProfession err',err);
      // })
  }

  login()
  {
    this.navCtrl.setRoot('LoginPage');
  }


}
