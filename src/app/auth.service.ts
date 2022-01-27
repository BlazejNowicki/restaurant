import { Injectable, OnInit } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  User,
  setPersistence,
} from '@angular/fire/auth';
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

export interface UserInfo {
  email: string | null;
  role: AuthState;
  canComment: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private user_changed = new Subject<UserInfo>();
  userChanged$ = this.user_changed.asObservable();

  userInfo: UserInfo = {
    email: null,
    role: AuthState.Stranger,
    canComment: false,
  };

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

  canComment() {
    if (this.auth.currentUser != null) {
      this.fierstore
        .collection('banned_users')
        .doc(this.auth.currentUser?.uid)
        .get()
        .subscribe({
          next: (v) => {
            let data = v.data() as { banned: boolean } | undefined;
            if (data) {
              if (data.banned) {
                this.userInfo.canComment = false;
              }
            }
            this.user_changed.next({ ...this.userInfo });
          },
          error: (e) => console.error(e),
          complete: () => console.info('complete'),
        });
    } else {
      this.user_changed.next({ ...this.userInfo });
    }
  }

  stateChanged() {
    if (this.auth.currentUser == null) {
      this.userInfo = {
        email: null,
        role: AuthState.Stranger,
        canComment: false,
      };
      this.user_changed.next(this.userInfo);
    } else if (this.auth.currentUser != null) {
      this.fierstore
        .collection('roles')
        .doc(this.auth.currentUser.uid)
        .get()
        .subscribe({
          next: (v) => {
            this.userInfo.email = this.auth.currentUser!.email;
            this.userInfo.canComment = false;

            let data = v.data() as { role: string } | undefined;
            if (data) {
              console.log(data.role);
              switch (data.role) {
                case 'manager':
                  this.userInfo.role = AuthState.Manager;
                  this.user_changed.next({ ...this.userInfo });
                  break;
                case 'admin':
                  this.userInfo.role = AuthState.Admin;
                  this.user_changed.next({ ...this.userInfo });
                  break;
                default:
                  console.error('Unknown role: ' + data);
              }
            } else {
              this.userInfo.role = AuthState.User;
              this.userInfo.canComment = true;
              this.canComment();
            }
          },
          error: (e) => console.error(e),
          complete: () => console.info('complete'),
        });
    }
  }

  getInfo() {
    return { ...this.userInfo };
  }
}
