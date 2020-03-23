import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BoardComponent } from './components/board/board.component';
import { CardComponent } from './components/card/card.component';
import { ShareBoardComponent } from './components/share-board/share-board.component';


const routes: Routes = [
  {path:'user-login',component:UserLoginComponent},
  {path:'user-signup',component:UserSignupComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'board', component:BoardComponent},
  {path:'card-dev',component:CardComponent},
  {path:'share-dev',component:ShareBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
