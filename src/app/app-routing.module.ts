import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [

  // welcome
  { path: "", component: WelcomeComponent },

  // movies
  // { path: "", redirectTo: "movies/popular", pathMatch: "full" },
  { path: "movies/:listType", component: MovieListComponent },

  //user
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent }


  // {path: "", redirectTo: "discover", pathMatch:"full"},
  // {path:"discover", component:MovieListComponent},
  // {path:"movies/:category",component:MovieCategoriesComponent},
  // {path:"register",component:RegisterComponent},
  // {path:"movie/:id", component:MovieDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
