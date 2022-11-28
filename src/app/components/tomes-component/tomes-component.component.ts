import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DBConectionService } from '../../services/dbconection.service';
import { CargarScriptsService } from '../../services/cargar-scripts.service';
import { ServiceModel } from 'src/app/models/serviceModel';
import { ServiceModelArea } from 'src/app/models/serviceModelArea';
import { ServiceModelMaquina } from 'src/app/models/serviceModelMaquina';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2'
import { OuthService } from 'src/app/services/outh.service';
@Component({
  selector: 'app-tomes-component',
  templateUrl: './tomes-component.component.html',
  styleUrls: ['./tomes-component.component.css']
})
export class TomesComponentComponent implements OnInit {
  searchText: any;
  searchDate: any;
  searchTextPend:any;
  serviceModel: ServiceModel = new ServiceModel()
  serviceModelArea: ServiceModelArea = new ServiceModelArea()
  serviceModelMaquina: ServiceModelMaquina = new ServiceModelMaquina()
  datatable: any = []
  bsModalRef: BsModalRef = new BsModalRef()
  datatableTomadas: any = []
  datatableTerminadas: any = []
  datatablePendientes: any = []
  maqunasAreas: any = []
  public load: boolean;
  areas: any = []
  public area1:string=''
  public txtID:string=''
  datatableUsuarios: any = []
  constructor(private Outh:OuthService,private modalService: BsModalService,private toastr: ToastrService,_CargarScriptsService:CargarScriptsService, public route: ActivatedRoute, private router: Router,private dBConectionService: DBConectionService) {
    this.load = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
    }, 1600);
    this.searchText=''
    this.onDataTable();
    this.onDataTablePendientes();
    this.onDataTableTomadas();
    this.onDataTableTerminadas();
    this.onDatatableAreas();
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
        this.Outh.logoutSoli();
        this.router.navigateByUrl("#");
        this.toastr.info('Se ha cerrado la sesión :)✅')
      } else if (result.isDenied) {
        this.toastr.info('Se cancelo cerrar sesión.❌')
      }
    })

}
  onclickTomadas(){
    this.toastr.warning('Esta solicitud ya ha sido tomada!');
  }

  onDataTable(){
  this.dBConectionService.getSolicitud().subscribe(res=>{
this.datatable=res;

  });
}
onDataTableTomadas(){
  this.dBConectionService.getSolicitudTomada().subscribe(res=>{
this.datatableTomadas=res;

  });
}
onDataTableTerminadas(){
  this.dBConectionService.getSolicitudTerminada().subscribe(res=>{
this.datatableTerminadas=res;

  });
}
onDataTablePendientes(){/**pendientes por asignar (no han sido tomadas) */
  this.dBConectionService.getSolicituPendiente().subscribe(res=>{
this.datatablePendientes=res;

  });
}
onDatatableAreas(){
  this.dBConectionService.getSolicitudArea().subscribe(res=>{
    this.maqunasAreas=res;

      });
}

openModal(template: TemplateRef<any>) {
  this.bsModalRef = this.modalService.show(template)
}

public getInputValue(inputValue:string){

  this.router.navigate(['/Sesion_mecanico/'+inputValue])
  .then(() => {
    window.location.reload();
  });



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
  this.serviceModel.emailSent2=select.emailSent2
  this.serviceModel.nombre3=select.nombre3
  }
  saveSomeThing() {
    this.bsModalRef.hide()
  }

  onDataTableUsuarios(){
    this.dBConectionService.getSolicitudMecanicos().subscribe(res=>{
  this.datatableUsuarios=res;
  console.log(this.datatableUsuarios)
    });
  }

  onUpdateSalida(serviceModel: ServiceModel): void {


    serviceModel.emailSent='true2'
      let valor='i'
      let valor2
      let valor3=(document.getElementById('txtNomina1') as HTMLInputElement).value

      for(let item of this.datatableUsuarios){
       valor2=item.nomina

        if((document.getElementById('txtNomina1') as HTMLInputElement).value === valor2 ){
        valor='existe'
        console.log('nohi')
        }
        else{
          console.log('hi',valor3,'valor',valor2)
        }

      }
      if(valor3==='0'){
        this.toastr.error('Número de nomina no encontrado!');
      }
      else{
        if(valor==='existe'){
          this.dBConectionService.addDiagnostico(serviceModel.idSolicitud, serviceModel)
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

                  window.location.reload()

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


    }



}
