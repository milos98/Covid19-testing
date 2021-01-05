import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './components/authentication/login/login.component';
import {AuthenticationComponent} from './components/authentication/authentication.component';
import {RegisterComponent} from './components/authentication/register/register.component';
import {StandardComponent} from './components/standard/standard.component';
import {PcrComponent} from './components/standard/tests/pcr/pcr.component';
import {FastComponent} from './components/standard/tests/fast/fast.component';
import {SelfComponent} from './components/standard/tests/self/self.component';
import {TestsComponent} from './components/standard/tests/tests.component';
import {AdminComponent} from './components/admin/admin.component';

const routes: Routes = [
  {path: '', component: StandardComponent, children: [
      {path: 'test/pcr', component: PcrComponent, pathMatch: 'full' },
      {path: 'test/fast', component: FastComponent, pathMatch: 'full' },
      {path: 'test/self', component: SelfComponent, pathMatch: 'full' },
      {path: 'tests', component: TestsComponent, pathMatch: 'full'},
    ]
  },
  {
    path: 'auth', component: AuthenticationComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },
  {path: 'admin', component: AdminComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
