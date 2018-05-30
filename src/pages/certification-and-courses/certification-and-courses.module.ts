import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CertificationAndCoursesPage } from './certification-and-courses';

@NgModule({
  declarations: [
    CertificationAndCoursesPage,
  ],
  imports: [
    IonicPageModule.forChild(CertificationAndCoursesPage),
  ],
})
export class CertificationAndCoursesPageModule {}
