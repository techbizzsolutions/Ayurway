import { Component,ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController, AlertController, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageSelectorProvider } from '../providers/image-selector/image-selector';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  profilepic: any = 'assets/imgs/ic_profile_dp1.jpg';
  UserFname: String;
  UserLname: String;
  user:any;
  showedAlert: boolean = false;
  confirmAlert: any;
  pages: Array<{
    title: string,
    component?: any,
    icon: any
  }>;
  constructor(public platform: Platform, statusBar: StatusBar,
    private domSanitizer: DomSanitizer,
    public menuCtrl: MenuController,
    public events: Events,
    private ionicApp: IonicApp,
    public alertCtrl: AlertController,
    public imgselect:ImageSelectorProvider,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString("#075e54");
      splashScreen.hide();
      this.setUser();
      events.subscribe('user:loggedIn', () => {
        this.setUser();
      });
      this.user = JSON.parse(localStorage.getItem('user'));
      // used for an example of ngFor and navigation
      this.pages = [{
          title: 'Home',
          component: 'TabsHomePage',
          icon: 'ios-home'
        },
        {
          title: 'Profile',
          component: 'ProfilePage',
          icon: 'md-person'
        },
        {
          title: 'Rate Us',
          icon: 'md-star'
        },
        {
          title: 'Share App',
          icon: 'md-share'
        },
        {
          title: 'Contact Us',
          icon: 'md-contact'
        },
        {
          title: 'Log Out',
          icon: 'md-log-out'
        }];
        if (this.user && this.user.islogin) {
          this.menuCtrl.swipeEnable(true, 'menu1');
          this.rootPage = 'TabsHomePage';
        } else {
          this.menuCtrl.swipeEnable(false, 'menu1');
          this.rootPage = 'LoginPage';
        }
        platform.registerBackButtonAction(() => {
          let activePortal = this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive();
          this.menuCtrl.close();
  
          if (activePortal) {
            activePortal.dismiss();
            activePortal.onDidDismiss(() => {
            });
            //return;
          }
  
          if (this.ionicApp._modalPortal.getActive()) {
            this.ionicApp._modalPortal.getActive().dismiss();
            this.ionicApp._modalPortal.getActive().onDidDismiss(() => {
            });
            return;
          }
          if (this.nav.length() == 1) {
            if (!this.showedAlert) {
              this.confirmExitApp();
            } else {
              this.showedAlert = false;
              this.confirmAlert.dismiss();
            }
          }
          if (this.nav.canGoBack()) {
            this.nav.pop();
          }
  
        });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
      switch(page.title)
      {
        case 'Home':
        this.nav.setRoot(page.component);
        break;
        case 'Profile':
        this.nav.push(page.component);
        break;
        case 'Rate Us':
        this.rateUs();
        break;
        case 'Share App':
        this.shareApp();
        break;
        case 'Contact Us':
        
        break;
        case 'Log Out':
        localStorage.removeItem('user');
        this.menuCtrl.swipeEnable(false, 'menu1');
        this.nav.setRoot('LoginPage');
        break;
        default:
        {

        }
      }
  }

  shareApp()
  {
    this.imgselect.shareApp("Law Protectors App is mainly for Their Customers who wants to register their Trademark, Copyright Application. Through this app They can easily fill up the form details and submit to the Company Authorized Representative.");
  }

  rateUs()
  {
    window.open("https://play.google.com/store/apps/details?id=com.technotwit.lowprotector", '_system');
  }

  setUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);
        if(this.user && this.user.islogin)
        {
          this.menuCtrl.swipeEnable(true, 'menu1');
          this.UserFname = this.user['personaldetails']['First'] + " " + this.user['personaldetails']['Last'];
          this.UserLname = this.user['iam'].name;
          this.profilepic = (this.user['img']) ? this.domSanitizer.bypassSecurityTrustResourceUrl(this.user['img']) : "assets/imgs/ic_profile_dp1.jpg";
       }
  }


    // confirmation pop up to exit from app 
    confirmExitApp() {
      this.showedAlert = true;
      this.confirmAlert = this.alertCtrl.create({
        subTitle: "Do you want to exit from the app?",
        buttons: [
          {
            text: 'NO',
            handler: () => {
              this.showedAlert = false;
              return;
            }
          },
          {
            text: 'YES',
            handler: () => {
              this.platform.exitApp();
            }
          }
        ]
      });
      this.confirmAlert.present();
    }
}

