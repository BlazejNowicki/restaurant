import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService, LoginData } from '../auth.service';

@Component({
  selector: 'app-account-managment',
  templateUrl: './account-managment.component.html',
  styleUrls: ['./account-managment.component.css'],
})
export class AccountManagmentComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.userChanged$.subscribe((state) =>
      console.log('Status changed' + state)
    );
  }

  addUser(data: LoginData) {
    console.log(data);
    this.auth
      .register(data)
      .then((r) => {
        console.log(r);
        this.auth.stateChanged();
        this.router.navigate(['home']);
      })
      .catch((err) => console.log(err));
  }

  logUser(data: LoginData) {
    this.auth
      .login(data)
      .then((r) => {
        console.log(r);
        this.auth.stateChanged();
        this.router.navigate(['home']);
      })
      .catch((err) => console.log('Błąd'));
  }
}
