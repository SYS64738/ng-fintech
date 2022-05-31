import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'homepage',
    loadChildren: () => import('./features/homepage/homepage.module').then(m => m.HomepageModule),
    canActivate: [AuthGuard]
  },
  { path: 'card',
    loadChildren: () => import('./features/card/card.module').then(m => m.CardModule),
    canActivate: [AuthGuard]
  },
  { path: 'movement',
    loadChildren: () => import('./features/movement/movement.module').then(m => m.MovementModule),
    canActivate: [AuthGuard]
  },
  { path: 'movement/:cardId',
    loadChildren: () => import('./features/movement/movement.module').then(m => m.MovementModule),
    canActivate: [AuthGuard]
  },
  { path: 'transfer',
    loadChildren: () => import('./features/transfer/transfer.module').then(m => m.TransferModule),
    canActivate: [AuthGuard]
  },
  { path: 'appointment',
    loadChildren: () => import('./features/appointment/appointment.module').then(m => m.AppointmentModule),
    canActivate: [AuthGuard]
  },
  { path: 'tax',
    loadChildren: () => import('./features/tax/tax.module').then(m => m.TaxModule),
    canActivate: [AuthGuard]
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
