import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  // add product
  addproduct(product : any) {
    product.id = this.afs.createId();
    return this.afs.collection('/product').add(product);
  }

  // get all products
  getAllproducts() {
    return this.afs.collection('/product').snapshotChanges();
  }

  // delete product
  deleteproduct(product : any) {
     this.afs.doc('/product/'+product.id).delete();
  }

  // update product
  updateproduct(product : any) {
    this.deleteproduct(product);
    this.addproduct(product);
  }

}
