import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubscriptionService {
  isSubscribed: Boolean = false;
  swRegistration: any = null;
  private applicationServerPublicKey = 'BBISJmDmHI4Yr0hTw90F-C2VpohCfqrhImrQExeGUBvHIz0GYOSllTEJi3RxuiKotIWRmbLrmgMj7D0b-k7kL-U';
  private apiUrl = 'https://pwa.aindo.com/shop/api/api-subscription-register.php';
  private apiUrlDel = 'https://pwa.aindo.com/shop/api/api-subscription-remove.php';
  constructor(private http: Http) {
    if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/shop/service-worker.js');
    }
  }

  isServiceWorkerRunning(member_id: number): any {
    let tis = this;
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Pusher Supported');
      navigator.serviceWorker.register('/shop/service-worker.js')
          .then(swReg => {
            console.log('Service Worker registered', swReg);
            this.swRegistration = swReg;
            this.swRegistration.pushManager.getSubscription()
                .then(function(subscription) {
                  tis.isSubscribed = !(subscription === null);
                  console.log(tis.isSubscribed);
                  if (tis.isSubscribed) {
                    console.log('User IS subscribed.');
                  } else {
                    console.log('User is NOT subscribed.');
                  }
                });

            if (!tis.isSubscribed) {
              this.subscribeUser(member_id);
            }
          })
          .catch(error => {
            console.log('Error : ', error);
          });
    } else {
      console.warn('Push Not supported');
    }
  }

  urlB64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  subscribeUser(member_id: number): any {
    let tis = this;
    const applicationServerKey = this.urlB64ToUint8Array(this.applicationServerPublicKey);
    this.swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
        .then(function (subscription) {
          const key = subscription.getKey('p256dh');
          const token = subscription.getKey('auth');
          
          console.log('User is subscribed.');
          console.log(tis)
          tis.http.post(tis.apiUrl, {data: JSON.stringify({
              endpoint: subscription.endpoint,
              key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))) : null,
              token: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))) : null,
              member: member_id
            })
          }).toPromise()
              .then(response => {console.log(response)})
              .catch(response =>{console.log(response)});
          tis.isSubscribed = true;
        })
        .catch(function (err) {
          console.log('Failed to subscribe the user: ', err);
        });
  }
  unsubscribeUser(): any {
    this.swRegistration.pushManager.getSubscription()
        .then(async (subscription) => {
          if (subscription) {
            console.log('unsubscribe');
            return subscription.unsubscribe();
            // this.http.delete(this.apiUrlDel)
            //   .map(res => res.json())
            //   .subscribe((data) => {
            //       console.log(data);
            //       console.log('User is unsubscribed.');
            //       this.isSubscribed = false;
            //     },
            //     (err: Response) => Observable.throw(err));
          }
        })
        .catch(function (error) {
          console.log('Error unsubscribing', error);
        });
  }
}
