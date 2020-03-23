import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    // this.autoLogin();
    if(this.userService.user != undefined){
      this.router.navigate(['/dashboard']);
    }
  }

  error="";
  loginDisabled = false;

  hidePassword = true;

  loginForm = this.fb.group({
    email : ['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
  });

  getEmailErrorMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return 'Email is required';
    }
    return this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.get('password').hasError('required')) {
      return 'Password is required';
    }
  }

  submitLoginFormData(){
    this.loginDisabled = true;
    this.userService.login(this.loginForm.value).subscribe(
      res =>{
        console.log(res);
        this.loginDisabled = false;
        if(res.message == "success"){
          this.userService.user = res.user;
          this.userService.setCookie();
          this.router.navigate(['/dashboard']);
        }else{
          this.error = res.message;
        }
      },
      err =>{
        this.loginDisabled = false;
        console.error(err);
      }
    );
  }

  autoLogin(){
    this.userService.login({email:"sricharan.donkada@gmail.com",password:"sricharan"}).subscribe(
      res =>{
        console.log(res);
        if(res.message == "success"){
          this.userService.user = res.user;
          this.router.navigate(['/dashboard']);
        }
      },
      err =>{
        console.error(err);
      }
    );
  }
}

