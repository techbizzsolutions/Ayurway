import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JournalsPage } from './journals';

@NgModule({
  declarations: [
    JournalsPage,
  ],
  imports: [
    IonicPageModule.forChild(JournalsPage),
  ],
})
export class JournalsPageModule {}
