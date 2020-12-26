import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  genders: string[] = ['Male', 'Female'];

  constructor(private router: Router) { }

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

  onSubmit(): boolean {
    console.log(this.registerForm);
    return true;
  }
}
