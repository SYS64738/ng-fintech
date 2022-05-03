import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userId: string | null = null;
  private _userName: string | null = null;
  private _userRole: string | null = null;
  private _userLogged: boolean = false

  constructor(protected http: HttpClient) {}

  get userName() {
    return this._userName;
  }

  get userRole() {
    return this._userRole;
  }

  logIn(userId: string, password: string): Observable<string> {
    this._userId = userId;
    this._userName = 'Roberto Chionna';
    this._userLogged = true;
    return of(userId);
  }

  logOut = () => this._userLogged = false;

  isUserLogged = (): boolean => this._userLogged;

}
