import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/validators/confirm-password.validator';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {

  constructor(private fb:FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
  }

  error="";
  success = false;
  signupDisabled = false;

  confirmPasswordError = false;
  hidePassword = true;
  hideConfirmPassword = true;

  signupForm = this.fb.group({
    username : ['',[Validators.required,Validators.minLength(5),Validators.pattern(/^[a-zA-Z0-9]*$/),Validators.maxLength(10)]],
    email : ['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  getEmailErrorMessage() {
    if (this.signupForm.get('email').hasError('required')) {
      return 'Email is required';
    }

    return this.signupForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  getUsernameErrorMessage(){
    if(this.signupForm.get('username').hasError('required')){
      return 'Username is required';
    } else if(this.signupForm.get('username').hasError('pattern')){
      return 'Spaces and special characters are not allowed'
    }
    return this.signupForm.get('username').hasError('minlength') || this.signupForm.get('username').hasError('maxlength') ? 'Username must be 5-10 characters long':'';
  }

  getPasswordErrorMessage() {
    if (this.signupForm.get('password').hasError('required')) {
      return 'Password is required';
    }

    return this.signupForm.get('password').hasError('minlength') ? 'Password must be atleast 6 characters long' : '';
  }

  submitSignupFormData(){
    this.signupDisabled = true;
    this.userService.signup(this.signupForm.value).subscribe(
      res =>{
        console.log(res);
        this.signupDisabled = false;
        if(res.message == "success"){
          this.success = true;
        }
        else{
          this.error = res.message;
        }
      },
      err =>{
        console.error(err);
        this.error = "Oops! Something went wrong!";
        this.signupDisabled = false;
      }
    );
  }
}

