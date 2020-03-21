import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient) { }
  public lists = [];

  public createList(obj){
    return this.http.post<any>(serverUrl + '/list/new-list',obj);
  }

  public getListData(id){
    return this.http.get<any>(serverUrl + '/list/list-data/'+id);
  }
}
