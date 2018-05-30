import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessionCategoryPage } from './profession-category';

@NgModule({
  declarations: [
    ProfessionCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessionCategoryPage),
  ],
})
export class ProfessionCategoryPageModule {}
