import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OuthService } from 'src/app/services/outh.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validar:number=0
  constructor(private toastr: ToastrService,private authService: OuthService,
    public router: Router,) { }

  ngOnInit(): void {
  }

  routeRedirect = '';





  login() {

      if((document.getElementById('username') as HTMLInputElement).value === 'Mantenimiento'&& (document.getElementById('password') as HTMLInputElement).value === 'Admin22#'){
        this.authService.loginAdmin();
        this.router.navigate(['/supervisor']);
        this.toastr.success('Bienvenid@')
      }
    else{
      this.toastr.error('Usuario o contraseña incorrectos')
    }
    }

  }

