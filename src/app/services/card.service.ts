import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http:HttpClient) { }

  public getCardTitle(id){
    return this.http.get<any>(serverUrl+'/card/card-title/'+id);
  }
}
