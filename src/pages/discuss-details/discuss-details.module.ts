import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscussDetailsPage } from './discuss-details';
import { RelativeTimePipe } from '../../pipes/relative-time/relative-time';

@NgModule({
  declarations: [
    DiscussDetailsPage,
    RelativeTimePipe
  ],
  imports: [
  IonicPageModule.forChild(DiscussDetailsPage),
  ],
})
export class DiscussDetailsPageModule {}
