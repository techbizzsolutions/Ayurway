import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareHomePage } from './share-home';

@NgModule({
  declarations: [
    ShareHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ShareHomePage),
  ],
})
export class ShareHomePageModule {}
