import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private cookie:CookieService) {
    console.log(cookie.getAll());
    if(cookie.get("user") != ""){
      console.log("got data from cookie");
      this.user = JSON.parse(cookie.get("user"));
    }
   }

  url = serverUrl;
  public user:any;
  public signup(obj){
    return this.http.post<any>(this.url + '/user/sign-up',obj);
  }

  public userId="";
  public login(obj){
    return this.http.post<any>(this.url + '/user/login', obj);
  }

  public setCookie(){
    this.cookie.set("user",JSON.stringify(this.user));
  }

  public logout(){
    this.cookie.deleteAll();
  }
}
