import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular/platform/platform';
import { ToastProvider } from '../toast/toast';
import 'rxjs/add/observable/of';

@Injectable()
export class ApiProvider {
  onDevice: boolean;
  private host: String = 'http://technotwitsolutions.com/ayurway/api/';
  constructor(private http: HttpClient, private network: Network, public plt: Platform, public toastProvider: ToastProvider) {
    this.plt.ready().then(() => {
      this.onDevice = this.plt.is('cordova');
    });
  }

  auth(url, data): Observable<any> {
    console.log(url, data)
    if (this.isOnline()) {
      return this.http.post<any>(this.host + url, data);
    }
    else {
      console.log("not connected");
      this.toastProvider.NotifyWithoutButton({
        message: "You are not connected to the internet", duration: 3000,
        position: 'top'
      });
      return Observable.of({ error: '2', message: "You are not connected to the internet", data: [] });
    }

  }

  add(url, data): Observable<any> {
    if (this.isOnline()) {
      return this.http.post<any>(this.host + url, data);
    }
    else {
      console.log('not connected');
      this.toastProvider.NotifyWithoutButton({
        message: "You are not connected to the internet", duration: 3000,
        position: 'top'
      });
      return Observable.of({ error: '2', message: "You are not connected to the internet", data: [] });

    }

  }

  isOnline(): Boolean {
    console.log('this.network.type', this.network.type);
    if (this.onDevice) {
      if (this.network.type == 'none') {
        return false;
      } else {
        return true;
      }
    } else {
      return true; // true since its not a device
    }
  }

}
