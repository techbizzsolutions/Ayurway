import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareCasePage } from './share-case';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ShareCasePage
  ],
  imports: [
  ComponentsModule,
  IonicPageModule.forChild(ShareCasePage),
  ],
})
export class ShareCasePageModule {}
