import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AuthService } from 'src/app/share/auth.service';
import { DataService } from 'src/app/share/data.service';
import { DialogComponent } from './dialog/dialog.component';
import { FileUploadService } from 'src/app/share/upload.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  productsList: any[] = [];
  fileUploads: any[] = [];
  search!: string

  constructor(private auth: AuthService, private data: DataService, public dialog: MatDialog, private uploadService: FileUploadService, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if(token){
      this.getAllproducts();
    }else{
      this.router.navigate(['login']);
    }
  }

  getAllproducts() {

    this.data.getAllproducts().subscribe({
      next: (res) => {
        this.productsList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      error: (err) => {
        this.alert('Error while fetching product data');
      }
    })


    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe({
      next: (fileUploads) => {
        this.fileUploads = fileUploads;
      }, error: () => {
        this.alert('Error while fetching product data');
      }
    })

  }

  findPic(picname: string) {
    const pic = this.fileUploads.filter((e) => e.name == picname)
    return pic[0].url
  }

  number(number: any) {
    let nf = new Intl.NumberFormat('en-US');
    return nf.format(number)
  }

  addProduct() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        title: "Add product"
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {

    //   }
    // });
  }

  logout() {
    this.auth.logout()
  }

  alert(text: string) {
    Swal.fire({
      icon: 'warning',
      title: text,
      customClass: environment.sweetClass,
      buttonsStyling: false,
    })
  }
}

