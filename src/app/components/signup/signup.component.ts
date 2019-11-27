import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit {

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

  // Sign up
  signUp(form) {

    if (form.status === 'VALID')
      this.userService.register(form.value).subscribe(
        res => {
          this.msg = res;
          this.msgClass = 'msgOk';
          setTimeout(() => this.autoLogin(form), 1000);
        },
        err => {
          this.msg = err.error;
          this.msgClass = 'msgKo';
        });

    else
      this.msg = { message: '.. complement all data ..' }

  }

  // auto login
  autoLogin(form) {
  
    this.userService.login(form.value).subscribe(
      res => {
        
        let user:object = {
          username: form.value.username,
          email: form.value.email,
          level: 2,
          // token: res['token']
        }

        this.userService.setUser(user, res['token']);
        this.router.navigate(['/movies/premieres']);
      },
      err => this.msg = err.error
    );
  }
}
