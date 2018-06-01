import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscussDetailsPage } from './discuss-details';

@NgModule({
  declarations: [
    DiscussDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscussDetailsPage),
  ],
})
export class DiscussDetailsPageModule {}
