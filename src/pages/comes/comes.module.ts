import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComesPage } from './comes';

@NgModule({
  declarations: [
    ComesPage,
  ],
  imports: [
    IonicPageModule.forChild(ComesPage),
  ],
})
export class ComesPageModule {}
