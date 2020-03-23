import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private http:HttpClient) { }
  public boards = [];
  public currnetBoard = null;
  public getBoardData(id){
    return this.http.get<any>(serverUrl + '/board/board-data/'+id);
  }
  public createNewBoard(obj){
    return this.http.post<any>(serverUrl + '/board/new-board',obj);
  }

  public shareBoard(obj){
    return this.http.post<any>(serverUrl + '/board/share',obj);
  }
}
