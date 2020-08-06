import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';



const routes: Routes = [

    { path: 'users', component: UsersComponent, },
    { path: 'tasks', component: TasksComponent, },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule {}

