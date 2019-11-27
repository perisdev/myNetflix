import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../signup/signup.component.scss']
})
export class LoginComponent implements OnInit {

  // to select a DOM element.
  @ViewChild('username', { read: ElementRef, static: false })
  username;

  // msg from endpoint
  msg: object;
  msgClass: String = 'msgKo';

  constructor(private userService: UserService, private router: Router) { }

  // to set focus in username.
  ngAfterViewInit() {
    setTimeout(() => {
      this.username.nativeElement.focus()
    }, 0);
  }

  ngOnInit() {
  }

  logIn(form) {

    if (form.status === 'VALID')
      this.userService.login(form.value).subscribe(
        res => {
          this.msg = res;
          this.msgClass = 'msgOk';
          setTimeout(() => this.autoProfile(res['token']), 1000);
        },
        err => {
          this.msg = err.error;
          this.msgClass = 'msgKo';
        });

    else
      this.msg = { message: '.. complement all data ..' }
  }

  autoProfile(token: string) {

    this.userService.getProfile(token).subscribe(
      res => {
        this.userService.setUser(res, token);
        this.router.navigate(['/movies/premieres']);
      },
      err => this.msg = err.error
    );
  }
}
