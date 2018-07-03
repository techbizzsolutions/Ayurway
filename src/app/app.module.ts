import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { SmsServiceProvider } from '../providers/sms-service/sms-service';
import { SMS } from '@ionic-native/sms';
import { DatePicker } from '@ionic-native/date-picker';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoaderServiceProvider } from '../providers/loader-service/loader-service';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { ImageSelectorProvider } from '../providers/image-selector/image-selector';
import { ApiProvider } from '../providers/api/api';
import { Network } from '@ionic-native/network';
import { ToastProvider } from '../providers/toast/toast';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    SuperTabsModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OpenNativeSettings,
    SMS,
    DatePicker,
    SocialSharing,
    FileTransfer,
    Camera,
    File,
    Network,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SmsServiceProvider,
    LoaderServiceProvider,
    ImageSelectorProvider,
    ApiProvider,
    ToastProvider
  ]
})
export class AppModule {}
