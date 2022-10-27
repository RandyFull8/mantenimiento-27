import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OuthService } from 'src/app/services/outh.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validar:number=0
  constructor(private authService: OuthService,
    public router: Router,) { }

  ngOnInit(): void {
  }

  routeRedirect = '';





  login() {

      if((document.getElementById('username') as HTMLInputElement).value === 'Jefe'&& (document.getElementById('password') as HTMLInputElement).value === 'Admin22#'){
        this.authService.loginAdmin();
        this.router.navigate(['/supervisor']);


      }}

  }

