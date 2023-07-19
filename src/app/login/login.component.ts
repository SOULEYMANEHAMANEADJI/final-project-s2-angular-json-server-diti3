import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  submitted = false;
  currentDate !: Date;
  currentTime !: string;
  loggedInUser !: string;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
    this.currentDate = new Date();
    setInterval(() => {
      const now = new Date();
      const hours = this.padDigits(now.getHours(), 2);
      const minutes = this.padDigits(now.getMinutes(), 2);
      const seconds = this.padDigits(now.getSeconds(), 2);
      this.currentTime = `${hours}:${minutes}:${seconds}`;    
    }, 1000);
  }
  padDigits(value: number, digits: number): string {
    return String(value).padStart(digits, '0');
  }
  login() {
    if (this.loginForm.valid) {
      this.http.get<any>('http://localhost:3000/signupUsers').subscribe(
        res => {
          const user = res.find((a: any) => {
            return (
              a.email === this.loginForm.value.email &&
              a.password === this.loginForm.value.password
            );
          });
  
          if (user) {
            alert('Login Successful');
            this.submitted = true;
            this.loginForm.reset();
            this.router.navigate(['employe/list']);
          } else {
            alert('User Not Found');
          }
        },
        err => {
          alert('Something went wrong');
        }
      );
    }
  }
}