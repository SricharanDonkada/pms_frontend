import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http:HttpClient) { }

  public createCardData = {
    list_id:"",
    card:null
  };

  public viewCardId:any;
  public viewCardData:any;

  public createCardFlag = false;

  public getCardTitle(id){
    return this.http.get<any>(serverUrl+'/card/card-title/'+id);
  }

  public createCard(obj){
    this.createCardData.card = obj;
    return this.http.post<any>(serverUrl + '/card/new-card',this.createCardData);
  }

  public getCardData(id){
    return this.http.get<any>(serverUrl + '/card/card-data/'+id);
  }

  public updateChecklist(){
    console.log(this.viewCardData.checklist);
    return this.http.post<any>(serverUrl+'/card/update-checklist-status',{card_id:this.viewCardId,checklist:this.viewCardData.checklist});
  }

  public moveCard(obj){
    return this.http.post<any>(serverUrl + '/card/move',obj);
  }
}
