import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalDetailsPage } from './journal-details';

@NgModule({
  declarations: [
    JournalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalDetailsPage),
  ],
})
export class JournalDetailsPageModule {}
