import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscussPage } from './discuss';

@NgModule({
  declarations: [
    DiscussPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscussPage),
  ],
})
export class DiscussPageModule {}
