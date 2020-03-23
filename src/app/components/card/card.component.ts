import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(public cardService:CardService, public dialogRef:MatDialogRef<CardComponent>, private fb:FormBuilder,
    public listService:ListService) { }

  ngOnInit(): void {
    this.checklistItems = [];
    if(!this.cardService.createCardFlag){
      this.cardService.getCardData(this.cardService.viewCardId).subscribe(
        res=>{
          console.log(res);
          this.cardService.viewCardData =res;
        },
        err=>{
          console.error(err);
        }
      );
    }
  }

  close(){
    this.dialogRef.close();
  }

  createCardForm = this.fb.group({
    title:['',[Validators.required]],
    description:['',[Validators.required]],
    checklistArray:this.fb.array([])
  });

  createCard(){
    let obj = this.createCardForm.value;
    obj["checklist"] = [];
    for(let checkbox of obj.checklistArray){
      obj.checklist.push({label:checkbox,status:false});
    }
    this.cardService.createCard(obj).subscribe(
      res=>{
        console.log(res);
        this.createCardForm.reset();
        this.updateList(res._id);
        this.dialogRef.close();
      },
      err=>{
        console.error(err);
      }
    );
  }

  updateList(card_id){
    for(let i = 0;i < this.listService.lists.length;i++){
      if(this.listService.lists[i]._id == this.cardService.createCardData.list_id){
        this.listService.lists[i].cards.push(card_id);
      }
    }
    
  }


  checklistItems:{
    item:string,
    status:boolean
  }[];

  get checklistArray(){
    return this.createCardForm.get('checklistArray') as FormArray;
  }

  addItem(){
    this.checklistArray.push(this.fb.control('',[Validators.required]));
  }

  removeItem(){
    this.checklistArray.removeAt(this.checklistItems.length - 1);
  }

  updateChecklistStatus(){
    setTimeout(()=>{
      this.cardService.updateChecklist().subscribe(
        res=>{
          console.log(res);
        },
        err=>{
          console.log(err);
        }
      );
    },50)

  }

  log(str){
    console.log(str);
  }

  moveTo(list_id){
    let removeFrom ="";
    let insertTo="";
    let card_id=this.cardService.viewCardData._id;
    for(let i=0;i < this.listService.lists.length;i++){
      for(let j = 0;j < this.listService.lists[i].cards.length;j++){
        if(this.listService.lists[i].cards[j] == card_id){
          removeFrom = this.listService.lists[i]._id;
          this.listService.lists[i].cards.splice(j,1);
          break;
        }
      }
    }
    for(let i = 0; i < this.listService.lists.length;i++){
      if(this.listService.lists[i]._id == list_id){
        insertTo = this.listService.lists[i]._id;
        this.listService.lists[i].cards.push(this.cardService.viewCardData._id);
        break;
      }
    }
    let obj = {removeFrom:removeFrom,insertTo:insertTo,card_id:card_id};
    console.log(obj);
    this.cardService.moveCard(obj).subscribe(
      res=>{
        console.log(res);
        this.close();
      },
      err=>{
        console.error(err);
      }
    );
  }

}
