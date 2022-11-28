import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceModel } from 'src/app/models/serviceModel';
import { ServiceModelArea } from 'src/app/models/serviceModelArea';
import { ServiceModelMaquina } from 'src/app/models/serviceModelMaquina';
import { ServiceModelDispositivo } from 'src/app/models/serviceModelDispositivo';
import { DBConectionService } from 'src/app/services/dbconection.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-formulario-solicitud',
  templateUrl: './formulario-solicitud.component.html',
  styleUrls: ['./formulario-solicitud.component.css'],
})


export class FormularioSolicitudComponent implements OnInit {
  serviceModel: ServiceModel = new ServiceModel()
  serviceModelArea: ServiceModelArea = new ServiceModelArea()
  serviceModelMaquina: ServiceModelMaquina = new ServiceModelMaquina()
  serviceModelDispositivo: ServiceModelDispositivo = new ServiceModelDispositivo()
  searchText:any
  searchTextDisp:any
  datatable: any = []
  maqunasAreas: any = []
  areas: any = []
  dispositivos: any=[]

  constructor(private toastr: ToastrService,public route: ActivatedRoute,private router: Router,private dBConectionService: DBConectionService,_CargarScriptsService:CargarScriptsService) { _CargarScriptsService.carga(['time']), _CargarScriptsService.carga(['NabBarFunctions'])}

  ngOnInit(): void {
    this.serviceModel.maquina = '';
    this.serviceModel.area = '';
    this.serviceModelMaquina.area='';

    this.onDataTable2();
    this.onDataTable3();
    this.onDataTable4();
  }

  

  onDataTable3(){
    this.dBConectionService.getSolicitudArea().subscribe(res=>{
  this.areas=res;
    });
  }
  
  onDataTable4(){
    this.dBConectionService.getSolicitudDispositivo().subscribe(res=>{
  this.dispositivos=res;
    });
  }
  onDataTable2(){
    this.dBConectionService.getSolicitudMaquina().subscribe(res=>{
  this.maqunasAreas=res;

    });
  }


  onAddSolicitud(serviceModel: ServiceModel): void {

      this.dBConectionService.addSolicitud(serviceModel).subscribe((res) => {
        if (res) {
console.log(res)

          Swal.fire({
            title: 'Registro de solicitud',
            text: "¡¡Presione el botón para confirmar!!",
            icon: 'info',
            showCancelButton: false,
            confirmButtonColor: 'rgb(255, 194, 28)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok,volver'
          }).then((result) => {
            if (result.isConfirmed) {

              window.location.reload()

            }
          
          })


        } else {
          alert('Error! :(')

        }
      })
    }
GetMaquinaArea(){
  this.dBConectionService.getSolicitudMaquina().subscribe(res=>{
    this.maqunasAreas=res;
    for(let i = 0 ; i < this.maqunasAreas.lenght ; i++){
     if(this.maqunasAreas.area==='Extrusión'){

     }
  }
      });

}




}
