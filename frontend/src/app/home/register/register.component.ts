import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerData: any;
  public message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  duration: number = 2;

  constructor(
    
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {};
    this.message = '';
  }

  ngOnInit(): void {}

  registerUser(){
    if(
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      this.message = 'Failed process: Incomplete data';
      this.openSnackBarError();
    } else {
      this._userService.registerUser(this.registerData).subscribe(
        (response: any) => {
          console.log('Token user',  response);
          localStorage.setItem('token', response.jwtToken);
          this._router.navigate(['/saveTask']);
          this.message = 'Success user registred';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err: any) => {
          console.log('Error al registrar el usuario: ', err);
          this.openSnackBarError();
        } 
      );
    }
  }
  openSnackBarSuccesfull(){
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: ['style-snackBarTrue']
    });
  }

  openSnackBarError(){
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.duration * 1000,
      panelClass: ['style-snackBarFalse']
    });
  }
}
