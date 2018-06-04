import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDetailsPage } from './new-details';

@NgModule({
  declarations: [
    NewDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewDetailsPage),
  ],
})
export class NewDetailsPageModule {}
