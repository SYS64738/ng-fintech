import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from "./core/auth/auth.guard";

const routes: Routes = [
  {
    path: 'homepage',
    loadChildren: () => import('./features/homepage/homepage.module').then(m => m.HomepageModule),
    canActivate: [AuthGuardService]
  },
  { path: 'card',
    loadChildren: () => import('./features/card/card.module').then(m => m.CardModule),
    canActivate: [AuthGuardService]
  },
  { path: 'movement',
    loadChildren: () => import('./features/movement/movement.module').then(m => m.MovementModule),
    canActivate: [AuthGuardService]
  },
  { path: 'movement/:cardId',
    loadChildren: () => import('./features/movement/movement.module').then(m => m.MovementModule),
    canActivate: [AuthGuardService]
  },
  { path: 'transfer',
    loadChildren: () => import('./features/transfer/transfer.module').then(m => m.TransferModule),
    canActivate: [AuthGuardService]
  },
  { path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
