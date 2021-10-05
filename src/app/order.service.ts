import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, from, Subject } from 'rxjs';

import { Order } from './shared/models/Order';
import { AlbumInput } from './shared/models/AlbumInput';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private shippedCollection: AngularFirestoreCollection = {} as AngularFirestoreCollection;
  private preorderedCollection: AngularFirestoreCollection = {} as AngularFirestoreCollection;
  shipped$: Observable<any>;
  preordered$: Observable<any>;

  albumAdded$ = new Subject<boolean>();

  constructor(private afs: AngularFirestore) {
    this.shippedCollection = afs.collection<Order>('shipped');
    this.preorderedCollection = afs.collection<Order>('preordered');
    this.shipped$ = this.shippedCollection.valueChanges({ idField: 'afId' });
    this.preordered$ = this.preorderedCollection.valueChanges({ idField: 'afId' });
  }

  

  addToOrders(artist: string, formInput: AlbumInput) {
    if (formInput.orderType === "shipped") {
      const newOrder = {
        artistName: artist, 
        album: formInput.selectedAlbum.name, 
        image: formInput.selectedAlbum.images[0].url, 
        orderType: formInput.orderType, 
        trackingNum: formInput.trackingNum 
      }
      return from(this.shippedCollection.add(newOrder))
        .subscribe({
          next: (() => {
            this.albumAdded$.next(true);
          }), 
          error: (() => {
            this.albumAdded$.next(false);
          })
        });
    } else {
      const newOrder = {
        artistName: artist, 
        album: formInput.selectedAlbum.name, 
        image: formInput.selectedAlbum.images[0].url, 
        orderType: formInput.orderType, 
        date: formInput.date 
      }

      return from(this.preorderedCollection.add(newOrder))
        .subscribe({
          next: (() => {
            this.albumAdded$.next(true);
          }), 
          error: (() => {
            this.albumAdded$.next(false);
          })
        });
    }
  }


  deleteOrder(order: Order) {
    if (order.orderType === 'shipped') {
      const orderRef = this.afs.doc('shipped/' + order.afId);
      orderRef.delete();
    } else {
      const orderRef = this.afs.doc('preordered/' + order.afId);
      orderRef.delete();
    }
  }
}
