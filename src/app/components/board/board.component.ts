import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BoardsService } from 'src/app/services/boards.service';
import { Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CardService } from 'src/app/services/card.service';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from '../card/card.component';
import { ShareBoardComponent } from '../share-board/share-board.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private userService:UserService, public boardService:BoardsService,public router:Router,public listService:ListService,
    private fb:FormBuilder, private cardService:CardService, public dialog:MatDialog) { }

  ngOnInit(): void {
    if(this.boardService.currnetBoard == null){
      this.router.navigate(['dashboard']);
    }else{
      this.loadLists();
      // this.getCardTitle("5e76d476212d1248fc64c662");
    }
  }

  cardTitles = {};
  newListFlag = false;

  loadLists(){
    return new Promise((resolve,reject)=>{
      this.listService.lists = [];
      this.boardService.currnetBoard.lists.forEach((list)=>{
        this.listService.getListData(list).subscribe(
          res=>{
            console.log(res);
            this.loadCardTitles(res.cards);
            this.listService.lists.push(res);
            
          },
          err=>{
            console.error(err);
          }
        );
      });
    });
  }

  loadCardTitles(cards){
    cards.forEach((id)=>{
      this.getCardTitle(id);
    });
  }

  getCardTitle(card_id){
    this.cardService.getCardTitle(card_id).subscribe(
      res=>{
        this.cardTitles[card_id] = res.title;
        // return res.title;
      },
      err=>{
        console.error(err);
        // return "Error";
      }
    );
  }

  newListForm = this.fb.group({
    title:['',[Validators.required]]
  });

  createList(){
    let obj = {board_id:this.boardService.currnetBoard._id,title:this.newListForm.value.title};
    this.listService.createList(obj).subscribe(
      res=>{
        this.newListForm.reset();
        this.listService.lists.push(res);
        this.boardService.currnetBoard.lists.push(res._id);
        this.newListFlag = false;
      },
      err=>{
        console.error(err);
      }
    );
  }


  openDialog(list_id){
    this.cardService.createCardFlag = true;
    this.cardService.createCardData.list_id = list_id;
    const dialogRef = this.dialog.open(CardComponent);
    dialogRef.afterClosed().subscribe(res=>{
      // this.loadLists();
      this.cardService.createCardFlag = false;
      for(let i = 0;i < this.listService.lists.length;i++){
        if(this.listService.lists[i]._id == this.cardService.createCardData.list_id){
          this.loadCardTitles(this.listService.lists[i].cards);
        }
      }
    });
  }

  shareDialog(){
    const dialogRef = this.dialog.open(ShareBoardComponent);
  }

  viewCard(card_id){
    this.cardService.createCardFlag = false;
    this.cardService.viewCardId = card_id;
    const dialogRef = this.dialog.open(CardComponent);
  }
}

