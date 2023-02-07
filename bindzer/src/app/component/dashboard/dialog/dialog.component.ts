import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUpload } from 'src/app/model/file';
import { DataService } from 'src/app/share/data.service';
import { FileUploadService } from 'src/app/share/upload.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: any;
  percentage = 0;
  imageURL: string = ''
  picName: string = ''

  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    picture: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>, private database: DataService, private uploadService: FileUploadService, ) {

     }

  ngOnInit(): void {

  }

  resetForm() {
    this.productForm.reset()
    this.imageURL = ''
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    const file = (event.target as HTMLInputElement).files![0];
    this.productForm.patchValue({
      avatar: file
    });
    this.productForm.get('picture')!.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
    this.picName = file.name
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  addproduct() {
    let productObj = {
      id: '',
      picture: this.picName,
      name: this.productForm.get('name')!.value,
      price:  this.productForm.get('price')!.value,
    }

    this.database.addproduct(productObj);
    this.upload()
    this.resetForm();

  }

  toClose() {
    this.dialogRef.close()
  }
}
