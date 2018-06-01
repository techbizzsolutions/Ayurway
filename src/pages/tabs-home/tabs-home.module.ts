import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsHomePage } from './tabs-home';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    TabsHomePage,
  ],
  imports: [
    SuperTabsModule.forRoot(),
    IonicPageModule.forChild(TabsHomePage),
  ],
})
export class TabsHomePageModule {}
