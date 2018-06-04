import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareCasePage } from './share-case';

@NgModule({
  declarations: [
    ShareCasePage,
  ],
  imports: [
    IonicPageModule.forChild(ShareCasePage),
  ],
})
export class ShareCasePageModule {}
