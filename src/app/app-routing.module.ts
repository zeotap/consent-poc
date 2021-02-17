import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { OktaAuthGuard } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { UserConsentPreferenceComponent } from './containers/user-consent-preference/user-consent-preference.component';

function onAuthRequired(oktaAuth, injector): void {
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user-consent-preference',
    component: UserConsentPreferenceComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-consent-preference'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
