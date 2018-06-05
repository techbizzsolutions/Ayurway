import { ToastController } from 'ionic-angular';

import { Injectable } from '@angular/core';

@Injectable()
export class ToastProvider {
  toast: any;
  constructor(public _toast: ToastController) {
    console.log('Hello ToastProvider Provider');
  }
  Notify(data: object): void {
    if (this.toast) {
      this.toast.dismiss();
    }
    data['dismissOnPageChange'] = true;
    data['clickHandler'] = function(t, isClosed) {
      console.log('i am clicked..', isClosed, t);

    }
    this.toast = this._toast.create(data);
    this.toast.present();
  }

  NotifyWithoutButton(data: object): void {
    if (this.toast) {
      this.toast.dismiss();
    }
    this.toast = this._toast.create(data);
    this.toast.present();
  }
}



// message	string	-	The message for the toast. Long strings will wrap and the toast container will expand.
// duration	number	-	How many milliseconds to wait before hiding the toast. By default, it will show until dismiss() is called.
// position	string	"bottom"	The position of the toast on the screen. Accepted values: "top", "middle", "bottom".
// cssClass	string	-	Additional classes for custom styles, separated by spaces.
// showCloseButton	boolean	false	Whether or not to show a button to close the toast.
// closeButtonText	string	"Close"	Text to display in the close button.
// dismissOnPageChange	boolean	false	Whether to dismiss the toast when navigating to a new page.
