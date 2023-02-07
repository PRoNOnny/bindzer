import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/share/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  login() {

    if(this.email == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter Email',
        customClass:  environment.sweetClass,
        buttonsStyling: false,
      })
      return;
    }

    if(this.password == '') {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter Password',
        customClass: environment.sweetClass,
        buttonsStyling: false,
      })
      return;
    }

    this.auth.login(this.email,this.password);

    this.email = '';
    this.password = '';

  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

}
