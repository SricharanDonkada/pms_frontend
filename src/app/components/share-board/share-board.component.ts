import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-share-board',
  templateUrl: './share-board.component.html',
  styleUrls: ['./share-board.component.scss']
})
export class ShareBoardComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ShareBoardComponent>, private fb:FormBuilder,private userService:UserService,
    private boardService:BoardsService) { }

  ngOnInit(): void {
  }

  error = "";

  close(){
    this.dialogRef.close();
  }

  shareForm = this.fb.group({
    email:['',[Validators.required,Validators.email]]
  });
  getEmailErrorMessage() {
    if (this.shareForm.get('email').hasError('required')) {
      return 'Email is required';
    }
    return this.shareForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  shareBoard(){
    let obj = {user_email:this.shareForm.value.email,board_id:this.boardService.currnetBoard._id};
    this.boardService.shareBoard(obj).subscribe(
      res=>{
        console.log(res);
        if(res.message == "success"){
          this.close();
        }else{
          this.error = res.message;
        }
      },
      err=>{
        console.error(err);
      }
    );
  }
}
