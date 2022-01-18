import { Injectable, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';

export interface LoginData {
  email: string;
  password: string;
}

export enum AuthState {
  User = 'User',
  Admin = 'Admin',
  Manager = 'Manager',
  Stranger = 'Stranger',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private user_changed = new Subject<AuthState>();
  userChanged$ = this.user_changed.asObservable();

  constructor(private auth: Auth, private fierstore: AngularFirestore) {}

  ngOnInit(): void {}

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: LoginData) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  stateChanged() {
    if (this.auth.currentUser == null) {
      this.user_changed.next(AuthState.Stranger);
    } else if (this.auth.currentUser != null) {
      this.fierstore
        .collection('roles')
        .doc(this.auth.currentUser.uid)
        .get()
        .subscribe({
          next: (v) => {
            let data = v.data() as { role: string } | undefined;
            if (data) {
              console.log(data.role)
              switch (data.role) {
                case 'manager':
                  this.user_changed.next(AuthState.Manager);
                  break;
                case 'admin':
                  this.user_changed.next(AuthState.Admin);
                  break;
                default:
                  console.error('Unknown role: ' + data);
              }
            } else {
              this.user_changed.next(AuthState.User);
            }
          },
          error: (e) => console.error(e),
          complete: () => console.info('complete'),
        });
    }
  }

  getState() {
    if (this.auth.currentUser == null) {
      return AuthState.Stranger;
    } else {
      return AuthState.User;
    }
  }
}
