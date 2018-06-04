import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs-home',
  templateUrl: 'tabs-home.html',
})
export class TabsHomePage {

  pages = [
    { pageName: 'ShareHomePage', title: 'Home', id: 'ShareHomeTab'},
    { pageName: 'DiscussPage', title: 'Discuss', id: 'DiscussTab'},
    { pageName: 'NewsPage', title: 'News', id: 'NewsTab'},
    { pageName: 'JobsPage', title: 'Jobs', id: 'JobsTab'},
    { pageName: 'JournalsPage', title: 'Journals', id: 'JournalsTab'}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) { }
 
  onTabSelect(ev: any) {
    }
    notification()
    {
      this.navCtrl.push('NotificationsPage');
    }

    search()
    {
      this.navCtrl.push('SearchPage');
    }
}
