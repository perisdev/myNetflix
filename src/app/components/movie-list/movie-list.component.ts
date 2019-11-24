import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  listType: String;
  movies: Array<Movie> = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      this.listType = params.get('listType');

      console.log(this.listType);
      
      this.movieService.getMovies(this.listType).subscribe(
        res => this.movies = Object.values(res),
        error => console.log(error)
      );
    });


    // this.route.paramMap.subscribe(params => {//me suscribo a cambios en los parámetros del router
    //   this.category = params.get('category')//obtenemos el parámetro category
    //   this.movieService.getMoviesByCategory(this.category) //lamamos al método del servicio movies para pedir las peliculas según la categoría
    //   .subscribe(res=>{
    //     this.peliculas=res['results'];// asignamos results a peliculas para poder acceder desde la plantilla HTML
    //   })
    // })

  }
}
