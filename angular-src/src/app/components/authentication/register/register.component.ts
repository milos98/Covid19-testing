import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../interfaces/user';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  failed = false;
  message!: string;
  registerForm!: FormGroup;
  genders: string[] = ['Male', 'Female'];

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required)
      }),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required)
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    const user: User = this.registerForm.value;
    console.log(user);
    this.authService.registerUser(user).subscribe(
      data => {
        if (data.success) {
          this.failed = false;
          this.snackBar.open('Registration successful', 'Log in',{
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          }).onAction().subscribe(snack => this.goToLogin());
        } else {
          this.failed = true;
          this.message = data.message;
        }
      }
    );
  }
}
