import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './manager/manager.component';
import { UserComponent } from './user/user.component';



const routes: Routes = [


  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule)
  },

    { path: 'user', component: UserComponent, },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}

