import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [

  // welcome
  { path: "", component: WelcomeComponent },

  // movies
  // { path: "", redirectTo: "movies/popular", pathMatch: "full" },
  { path: "movies/:listType", component: MovieListComponent },
  { path: "movies/title/:title", component: MovieListComponent },

  //user
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
