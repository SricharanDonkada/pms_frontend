import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BoardsService } from 'src/app/services/boards.service';
import { Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private userService:UserService, public boardService:BoardsService,private router:Router,public listService:ListService,
    private fb:FormBuilder, private cardService:CardService) { }

  ngOnInit(): void {
    if(this.boardService.currnetBoard == null){
      this.router.navigate(['dashboard']);
    }else{
      this.loadLists();
    }
  }

  newListFlag = false;

  loadLists(){
    return new Promise((resolve,reject)=>{
      this.listService.lists = [];
      this.boardService.currnetBoard.lists.forEach((list)=>{
        this.listService.getListData(list).subscribe(
          res=>{
            this.listService.lists.push(res);
          },
          err=>{
            console.error(err);
          }
        );
      });
    });
  }

  getCardTitle(card_id){
    this.cardService.getCardTitle(card_id).subscribe(
      res=>{
        return res;
      },
      err=>{
        console.error(err);
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
        this.listService.lists.push(res);
        this.boardService.currnetBoard.lists.push(res._id);
        this.newListFlag = false;
      },
      err=>{
        console.error(err);
      }
    );
  }
}

