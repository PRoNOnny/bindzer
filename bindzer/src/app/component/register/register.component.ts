import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/share/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';
  confirmPassword : string = ''

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      this.alert('Please enter email');
      return;
    }

    if(this.password == '') {
      this.alert('Please enter password');
      return;
    }

    if(this.password != this.confirmPassword) {
      this.alert('password is incorrect');
      return;
    }

    this.auth.register(this.email,this.password);

    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  alert(text:string){
    Swal.fire({
      icon: 'warning',
      title: text,
      customClass:  environment.sweetClass,
      buttonsStyling: false,
    })
  }

}
