import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceModel } from 'src/app/models/serviceModel';
import { DBConectionService } from 'src/app/services/dbconection.service';
import { OuthService } from 'src/app/services/outh.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-historial-mecanicos',
  templateUrl: './historial-mecanicos.component.html',
  styleUrls: ['./historial-mecanicos.component.css']
})
export class HistorialMecanicosComponent implements OnInit {
  datatable: any = []
  idSolicitudm:string=""
  serviceModel: ServiceModel = new ServiceModel()
  constructor(private toastr: ToastrService,private Outh:OuthService,public route: ActivatedRoute,private router: Router, private dBConectionService: DBConectionService) { }

  ngOnInit(): void {
    this.serviceModel.estatusActividad='';
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSMToma(id)
          
            .subscribe({
              next: response => {
                this.datatable = response;
              
          this.idSolicitudm=id;

              }
            });
        }
      }


    })
  }

  OnClickExit(){
    Swal.fire({
      title: 'Cerrar Sesión',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.Outh.logoutAdmin()
        this.router.navigateByUrl("#");
        this.toastr.info('Se ha cerrado la sesión :)✅')
      } else if (result.isDenied) {
        this.toastr.info('Se cancelo cerrar sesión.❌')
      }
    })

}
}
