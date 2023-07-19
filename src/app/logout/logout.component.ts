import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  public logoutForm!: FormGroup;
  currentDate !: Date;
  currentTime !: string;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logoutForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required]
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
  signUp() {
    if (this.logoutForm.invalid) {
      alert("Please fill in all the required fields");
      return;
    }
  
    this.http.post<any>("http://localhost:3000/signupUsers", this.logoutForm.value)
      .subscribe(res => {
        alert("Signup Successful");
        this.logoutForm.reset();
        this.router.navigate(['login']);
      }, err => {
        alert("Something went wrong");
      });
  }
  
}
