import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServiceModel } from 'src/app/models/serviceModel';
import { ServiceModelArea } from 'src/app/models/serviceModelArea';
import { ServiceModelMaquina } from 'src/app/models/serviceModelMaquina';
import { ServiceModelMecanico } from 'src/app/models/serviceModelMecanico';
import { DBConectionService } from 'src/app/services/dbconection.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';
import { OuthService } from 'src/app/services/outh.service';
@Component({
  selector: 'app-supervisa-areas',
  templateUrl: './supervisa-areas.component.html',
  styleUrls: ['./supervisa-areas.component.css']
})
export class SupervisaAreasComponent implements OnInit {
  sevicemodelA!:ServiceModel[]
  bsModalRef: BsModalRef = new BsModalRef()
  searchText:any
  searchTextID: any;
  searchTextNS: any;
  searchTextFS: any;
  searchTextAS: any;
  searchTextMAQ: any;
  searchTextDIS: any;
  searchTextNomI: any;
  searchTextNomT: any;
  searchTextNomMec: any;/** */
  searchTextFecI: any;
  searchTextFecCierr: any;
  searchTextGenP: any;
  searchTextTimT: any;
  searchTextTSani: any;
  searchTextStat: any;
  serviceModel: ServiceModel = new ServiceModel()
  serviceModelArea: ServiceModelArea = new ServiceModelArea()
  serviceModelMaquina: ServiceModelMaquina = new ServiceModelMaquina()
  serviceModelMecanico: ServiceModelMecanico = new ServiceModelMecanico()
  nominaimp:string=''
  maqunasAreas: any = []
  areas: any = []
  public load: boolean;
  datatable: any = []
  datatableTT: any = []
  datatableCerradas: any = []
  datatableUsuarios: any = []
  public page:number=0
  public page2:number=0
  public page3:number=0
  public search:string='';
  constructor(private authService: OuthService,private toastr: ToastrService,private modalService: BsModalService,public route: ActivatedRoute,private router: Router,private dBConectionService: DBConectionService) {
    this.load = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
    }, 1600);
    
    this.serviceModel.estatusActividad='';
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSuperArea(id)
          
            .subscribe({
              next: response => {
                this.datatable = response;
              
this.nominaimp=id

              }
            });
        }
      }


    })
  this.onDataTableUsuarios()
  this.OndatatableTemporal()
  this.OndatatableCerradas()
  }
  Ondatatable(){
    
    this.serviceModel.estatusActividad='';
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSuperArea(id)
          
            .subscribe({
              next: response => {
                this.datatable = response;
              
this.nominaimp=id

              }
            });
        }
      }


    })
  }

  OndatatableTemporal(){
    
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')

        if (id) {
          this.dBConectionService.getSolicitudSuperAreaTT(id)
          
            .subscribe({
              next: response => {
                this.datatableTT = response;
              
this.nominaimp=id

              }
            });
        }
      }


    })
  }

  OndatatableCerradas(){
    
    this.dBConectionService.getSolicituCerradas().subscribe(res=>{
      this.datatableCerradas=res;
    
        });
      
  }
  sinFiltros(){
    this.searchTextStat=''
    this.searchTextGenP=''
    this.searchTextID=''
    this.searchTextNS=''
    this.searchTextFS=''
    this.searchTextAS=''
    this.searchTextMAQ=''
    this.searchTextDIS=''
    this.searchTextNomI=''
    this.searchTextNomT=''
    this.searchTextNomMec=''
  }

 

  onDataTableUsuarios(){
    this.dBConectionService.getUsuarios().subscribe(res=>{
  this.datatableUsuarios=res;
  console.log(this.datatableUsuarios)
    });
  }


openModal(template: TemplateRef<any>) {
  this.bsModalRef = this.modalService.show(template)
}

saveSomeThings() {
  this.bsModalRef.hide()
}
onSetData(select: any) {
  this.serviceModel.idSolicitud =select.idSolicitud
  this.serviceModel.nombreSolicitante =select.nombreSolicitante
  this.serviceModel.correo =select.correo
  this.serviceModel.fechaSolicitud=select.fechaSolicitud
  this.serviceModel.horaSolicitud =select.horaSolicitud
  this.serviceModel.area =select.area
  this.serviceModel.maquina =select.maquina
  this.serviceModel.dispositivo=select.dispositivo
  this.serviceModel.descripcionProblema =select.descripcionProblema
  this.serviceModel.nomina =select.nomina
  this.serviceModel.nombre =select.nombre
  this.serviceModel.fechaInicio=select.fechaInicio
  this.serviceModel.horaInicio =select.horaInicio
  this.serviceModel.diagnostico=select.diagnostico
  this.serviceModel.tipoFalla=select.tipoFalla
  this.serviceModel.emailSent =select.emailSent
  this.serviceModel.nombre2=select.nombre2
  this.serviceModel.nomina2=select.nomina2
  this.serviceModel.asignacion=select.asignacion
  this.serviceModel.generoParo =select.generoParo
  this.serviceModel.paroCorrectivo=select.paroCorrectivo
  this.serviceModel.paroOperativo =select.paroOperativo
  this.serviceModel.paroRefaccion =select.paroRefaccion
  this.serviceModel.tiempoTotal =select.tiempoTotal
  this.serviceModel.grasaUtilizada=select.grasaUtilizada
  this.serviceModel.refaMateHerra =select.refaMateHerra
  this.serviceModel.fechaFinal =select.fechaFinal
  this.serviceModel.horaFinal =select.horaFinal
  this.serviceModel.trabajoSanitizado=select.trabajoSanitizado
  this.serviceModel.estatusActividad =select.estatusActividad
  this.serviceModel.firmaSolicitante =select.firmaSolicitante
  this.serviceModel.emailSent2='true2'
  }

  onUpdateSalida(serviceModel: ServiceModel): void {
    let valor='i'
    let valor2
    for(let item of this.datatableUsuarios){
     valor2=item.nombre3
      if( (document.getElementById('txtfirma') as HTMLInputElement).value === valor2){
      valor='existe'
      }

    }
    if(valor==='existe'){
      //  serviceModel.nomina2= parseInt((document.getElementById('txtNomina2') as HTMLInputElement).value)
    this.dBConectionService.addRevision(serviceModel.idSolicitud, serviceModel)
    .subscribe((res) => {
      if (res) {
        Swal.fire({
          title: 'Operación realizada con éxito',
          text: "¡¡Presione el botón para confirmar!!",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: 'rgb(255, 194, 28)',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok,volver'
        }).then((result) => {
          if (result.isConfirmed) {

           this.Ondatatable()
          }
        })

      } else {
        alert('Error! :(')
      }
    })


    }else{
      this.toastr.error('Número de nomina no encontrado!');


    }

  }
nextPage(){
this.page+=5;
}
previousPage(){
  if(this.page>0)
  this.page-=5;

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
      this.authService.logoutAdmin()
      this.router.navigateByUrl("#");
      this.toastr.info('Se ha cerrado la sesión :)✅')
    } else if (result.isDenied) {
      this.toastr.info('Se cancelo cerrar sesión.❌')
    }
  })

}
}
