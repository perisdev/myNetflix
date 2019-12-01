import { Component } from '@angular/core';
import { UserService } from '../app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myNetflix';

  constructor(private userService: UserService, private router: Router) { }

}
