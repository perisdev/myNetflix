import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit {

  // to select a DOM element.
  @ViewChild('username', { read: ElementRef, static: false })
  username;

  msg: object; // res msg from endpoint
  msgClass: String = 'msgKo';

  constructor(private userService: UserService) { }

  // to set focus in username.
  ngAfterViewInit(){
    setTimeout(() => { 
      this.username.nativeElement.focus()
     }, 0);
  }  

  signUp(form) {
    console.log(form);

    if (form.status === 'VALID') {

      this.userService.register(form.value).subscribe(
        res => {
          this.msg = res;
          this.msgClass = 'msgOk';
          this.userService.isRegisted = true;
        },
        err => {
          this.msg = err.error;
          this.msgClass = 'msgKo';
        }
      )
    } else {
      this.msg = { message: '.. complement all data ..' }
    }
  }
}
