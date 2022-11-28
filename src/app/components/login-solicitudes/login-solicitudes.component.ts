import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OuthService } from 'src/app/services/outh.service';

@Component({
  selector: 'app-login-solicitudes',
  templateUrl: './login-solicitudes.component.html',
  styleUrls: ['./login-solicitudes.component.css']
})
export class LoginSolicitudesComponent implements OnInit {
  validar:number=0
  constructor(private toastr: ToastrService,private authService: OuthService,
    public router: Router) { }

  ngOnInit(): void {
  }

  routeRedirect = '';





  login() {

      if((document.getElementById('username') as HTMLInputElement).value === 'Mecanicos'&& (document.getElementById('password') as HTMLInputElement).value === 'user22#'){
        this.authService.loginSoli();
        this.router.navigate(['/Resumen_Solicitudes']);
        this.toastr.success('Bienvenid@')


      }
    else
    {
this.toastr.error('Usuario o contraseña incorrectos')
    }

    }



  }





