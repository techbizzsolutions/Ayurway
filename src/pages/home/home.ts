import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private register : FormGroup;
  user:any;
  constructor(
    public navCtrl: NavController,
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
      localStorage.setItem('user', JSON.stringify(this.register.value));
      this.navCtrl.push('OtpPage');
  }
}
