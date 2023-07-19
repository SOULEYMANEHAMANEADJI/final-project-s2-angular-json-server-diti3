import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './employe/add/add.component';
import { EditComponent } from './employe/edit/edit.component';
import { ListComponent } from './employe/list/list.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { AddServiceComponent } from './employe/add-service/add-service.component';

const routes: Routes = [
  {path: "employe/add", component: AddComponent},
  {path: "employe/add-service", component: AddServiceComponent},
  {path: "employe/edit/:id", component: EditComponent},
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},
  {path: 'employe/list', component: ListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
