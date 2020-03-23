import { Component, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public boardService: BoardsService, private userService: UserService, private router: Router,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loadBoardsData().then(()=>{
      // this.sortBoards();
      // this.viewBoard(this.boardService.boards[0]);
    });
  }

  newFlag = false;

  createBoard(){
    let obj = {title:this.createBoardForm.value.title,user_id:this.userService.user._id};
    this.boardService.createNewBoard(obj).subscribe(
      res=>{
        console.log(res);
        this.userService.user.boards.push(res._id);
        this.newFlag = false;
        this.boardService.currnetBoard = res;
        this.loadBoardsData().then(()=>{
          this.router.navigate(['board']);
        });
      },
      err=>{
        console.error(err);
      }
    );
  }

  createBoardForm = this.fb.group({
    title:['',[Validators.required]],
  });

  viewBoard(board){
    this.boardService.currnetBoard = board;
    this.router.navigate(['board']);
  }

  loadBoardsData(){
    return new Promise((resolve,reject)=>{
      this.boardService.boards = [];
      if (this.userService.user == null) {
        this.router.navigate(['/user-login']);
      }
      else {
        this.userService.user.boards.forEach(board => {
          this.boardService.getBoardData(board).subscribe(
            res => {
              this.boardService.boards.push(res);
              resolve();
            },
            err => {
              console.error(err);
            }
          );
        });
      }
    });
  }

  // sortBoards(){
  //   let temp = [];
  //   for(let i = this.userService.user.boards.length -  1;i >= 0;i--){
  //     for(let j = 0;j < this.boardService.boards.length;j++){
  //       if(this.userService.user.boards[i] == this.boardService.boards[j]._id){
  //         temp.push(this.boardService.boards[j]);
  //       }
  //     }
  //   }
  //   console.log("sorted list");
  //   console.log(temp);
  //   this.boardService.boards = temp;
  // }
}
