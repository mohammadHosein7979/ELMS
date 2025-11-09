import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexLayoutComponent} from "./layout/index-layout/index-layout.component";
import {AuthGuardService} from "./shared/services/auth-gaurd.service";
import {
  IndexLayoutLandingComponent
} from "./landing/layout-landing/index-layout-landing/index-layout-landing.component";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'panel',
    component:IndexLayoutComponent,
    children: [
      {path: '',loadChildren: () => import('./pages/education/education.module').then(m => m.EducationModule), canActivate: [AuthGuard] },
      {path: 'my-training',loadChildren: () => import('./pages/my-training/my-training.module').then(m => m.MyTrainingModule), canActivate: [AuthGuard] },
      {path: 'my-educational-system',loadChildren: () => import('./pages/my-educational-system/my-educational-system.module').then(m => m.MyEducationalSystemModule), canActivate: [AuthGuard] },
      {path: 'reports',loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule), canActivate: [AuthGuard] },
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '**', redirectTo: '/' }
    ],
    // canActivate: [AuthGuardService]
  },
  {
    path: '',
    component:IndexLayoutLandingComponent,
    children: [
      {path: '',loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
    ],
    // canActivate: [AuthGuardService]
  },
  {path: 'auth',loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
