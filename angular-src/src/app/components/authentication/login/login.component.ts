import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  failed = false;
  message!: string;
  loginForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  onSubmit(): any {
    this.authService.authenticateUser(this.loginForm.value).subscribe(
      data => {
        if (data.success) {
          this.failed = false;
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['/dashboard']);
        } else {
          this.failed = true;
          this.message = data.message;
        }
      }
    );
  }

}
