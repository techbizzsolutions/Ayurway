import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicationsPage } from './publications';

@NgModule({
  declarations: [
    PublicationsPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicationsPage),
  ],
})
export class PublicationsPageModule {}
