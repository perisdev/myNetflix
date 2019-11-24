import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';


const routes: Routes = [
  { path: "", redirectTo: "movies/popular", pathMatch: "full" },
  { path: "movies/:listType", component: MovieListComponent }
  
  // {path: "", redirectTo: "discover", pathMatch:"full"},
  // {path:"discover", component:MovieListComponent},
  // {path:"movies/:category",component:MovieCategoriesComponent},
  // {path:"register",component:RegisterComponent},
  // {path:"login", component:LoginComponent},
  // {path:"movie/:id", component:MovieDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
