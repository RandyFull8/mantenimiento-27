import { Component, OnInit, TemplateRef } from '@angular/core';
//import { Component, OnInit, TemplateRef } from '@angular/core';
import { CargarScriptsService } from 'src/app/services/cargar-scripts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DBConectionService } from 'src/app/services/dbconection.service';
import { ServiceModel } from 'src/app/models/serviceModel';
import { ServiceModelArea } from 'src/app/models/serviceModelArea';
import { ServiceModelMaquina } from 'src/app/models/serviceModelMaquina';
import { ServiceModelMecanico} from 'src/app/models/serviceModelMecanico';
import { ServiceModelDispositivo} from 'src/app/models/serviceModelDispositivo';

/**librerias */
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx';
import { OuthService } from 'src/app/services/outh.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
/**librerias */


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  /**Servicios */
  serviceModel: ServiceModel = new ServiceModel()
  serviceModelArea: ServiceModelArea = new ServiceModelArea()
  serviceModelMaquina: ServiceModelMaquina = new ServiceModelMaquina()
  serviceModelMecanico: ServiceModelMecanico = new ServiceModelMecanico()
  serviceModelDispositivo: ServiceModelDispositivo = new ServiceModelDispositivo()
    /**Servicios */
nombreMaquina!:string;
  /**capturas pipe */
  searchText:any
  searchTextAr:any
  searchTextMaq:any
  searchTextID: any;
  searchTextNS: any;
  searchTextFS: any;
  searchTextAS: any;
  searchTextMAQ: any;
  searchTextDIS: any;
  searchTextNomI: any;
  searchTextNomT: any;
  searchTextNomMec: any;
  searchTextFecI: any;
  searchTextFecCierr: any;
  searchTextGenP: any;
  searchTextTimT: any;
  searchTextTSani: any;
  searchTextStat: any;
/**capturas pipe */

    /**libreria pipe y paginación */
  public page:number=0
  public search:string='';
/**libreria pipe y paginación */

  /**arreglos carga de maquinas y areas */
  maqunasAreas: any = []
  areas: any = []
  /**arreglos carga de maquinas y areas */
  bsModalRef: BsModalRef = new BsModalRef()
  datatable: any = []
  datatableTT: any = []
  datatableerradas: any = []
  datatable2: any = []
  datatable3: any = []
  datatable4: any = []
  datatable5: any = []
  datatable6: any = []
  public load: boolean;
  constructor(private modalService: BsModalService,private toastr: ToastrService,private Outh:OuthService,public route: ActivatedRoute,private router: Router,private dBConectionService: DBConectionService,_CargarScriptsService:CargarScriptsService) {
     this.load = false;
     _CargarScriptsService.carga(['time']), _CargarScriptsService.carga(['NabBarFunctions'])}
  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
    }, 1600);
    this.onDataTable();
    this.onDataTable2();
    this.onDataTable3();
    this.onDataTable4();
    this.onDataTable5();
    this.onDataTable6();
    this.onDataTableTT();
    this.onDataTableCerradas();
  }
  onDataTable(){
    this.dBConectionService.getSolicituPendientes().subscribe(res=>{
  this.datatable=res;

    });
  }
  onDataTableTT(){
    this.dBConectionService.getSolicituTemporales().subscribe(res=>{
  this.datatableTT=res;

    });
  }
  onDataTableCerradas(){
    this.dBConectionService.getSolicituCerradas().subscribe(res=>{
  this.datatableerradas=res;

    });
  }
  saveSomeThing() {

    let nameInput=(document.getElementById('txtNamed') as HTMLInputElement).value
     let name = nameInput+'.xlsx';
     let element = document.getElementById('season-tble');
     const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

     const book: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

     XLSX.writeFile(book, name);

     (document.getElementById('txtNamed') as HTMLInputElement).value=''

   }
  onDataTable2(){
    this.dBConectionService.getSolicitudArea().subscribe(res=>{
  this.datatable2=res;

    });
  }
  onDataTable3(){
    this.dBConectionService.getSolicitudMaquina().subscribe(res=>{
  this.datatable3=res;
    });
  }
  onDataTable4(){
    this.dBConectionService.getSolicitudMecanico().subscribe(res=>{
  this.datatable4=res;
    });
  }
  onDataTable5(){

    this.dBConectionService.getSolicitudArea().subscribe(res=>{
  this.datatable5=res;
  console.log(this.areas)
    });
  }
  onDataTable6(){

    this.dBConectionService.getSolicitudDispositivo().subscribe(res=>{
  this.datatable6=res;
  console.log(this.datatable6)
    });
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
  onAddSolicitud(serviceModelArea: ServiceModelArea): void {
    let valor='i'
    let valor2
    for(let item of this.datatable5){
     valor2=item.nombre
      if( (document.getElementById('txtNombreArea') as HTMLInputElement).value === valor2){
      valor='existe'
      }

    }
if(valor==='existe'){
  this.toastr.error('Esta área ya se encuentra en el sistema!');
}else{

  this.dBConectionService.addArea(serviceModelArea).subscribe((res) => {
    if (res) {
console.log(res)

      Swal.fire({
        title: 'Registro de área',
        text: "¡¡Presione el botón para confirmar!!",
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: 'rgb(255, 194, 28)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok,volver'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Registro exitoso!',
            'success',

          ),
          //window.location.reload()
          this.onDataTable2();
          this.clearCampos();
        }
      })


    } else {
      alert('Error! :(')

    }
  })
}

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
    this.serviceModel.nomina2 =select.nomina2
    this.serviceModel.nombre2 =select.nombre2
    this.serviceModel.fechaInicio=select.fechaInicio
    this.serviceModel.horaInicio =select.horaInicio
    this.serviceModel.diagnostico=select.diagnostico
    this.serviceModel.tipoFalla=select.tipoFalla
    this.serviceModel.emailSent =select.emailSent
    this.serviceModel.generoParo =select.generoParo
    this.serviceModel.paroCorrectivo=select.paroCorrectivo
    this.serviceModel.paroOperativo =select.paroOperativo
    this.serviceModel.paroRefaccion =select.paroRefaccion
    this.serviceModel.tiempoTotal =select.tiempoTotal
    this.serviceModel.grasaUtilizada=select.grasaUtilizada
    this.serviceModel.refaMateHerra =select.refaMateHerra
    this.serviceModel.tareasEjecutadas=select.tareasEjecutadas
    this.serviceModel.fechaFinal =select.fechaFinal
    this.serviceModel.horaFinal =select.horaFinal
    this.serviceModel.trabajoSanitizado=select.trabajoSanitizado
    this.serviceModel.estatusActividad =select.estatusActividad
    this.serviceModel.firmaSolicitante =select.firmaSolicitante
    this.serviceModel.emailSent2=select.emailSent2
    }
  onAddSolicitudMecanico(serviceModelMecanico: ServiceModelMecanico): void {
    let valor='i'
    let valor2
    for(let item of this.datatable4){
     valor2=item.nomina
      if( (document.getElementById('txtNomina') as HTMLInputElement).value === valor2){
      valor='existe'
      }

    }
    if(valor==='existe'){
      this.toastr.error('Esta persona ya se encuentra en el sistema!');
    }else{
      this.dBConectionService.addMecanico(serviceModelMecanico).subscribe((res) => {
        if (res) {
  console.log(res)

          Swal.fire({
            title: 'Registro de mecánico',
            text: "¡¡Presione el botón para confirmar!!",
            icon: 'info',
            showCancelButton: false,
            confirmButtonColor: 'rgb(255, 194, 28)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok,volver'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Registro exitoso!',
                'success',

              ),
              //
              this.onDataTable4();
              this.clearCampos();
            }
          })


        } else {
          alert('Error! :(')

        }
      })
    }

  }

  onAddSolicitudMaquina(serviceModelMaquina: ServiceModelMaquina): void {
    let valor='i'
    let valor2
    for(let item of this.datatable3){
     valor2=item.codigo
      if( (document.getElementById('txtCodigoMaquina') as HTMLInputElement).value === valor2){
      valor='existe'
      }

    }
    if(valor==='existe'){
      this.toastr.error('Esta máquina ya se encuentra en el sistema!');
    }
else{
  this.serviceModelMaquina.nombre=(document.getElementById('txtNombreMaquina') as HTMLInputElement).value+'-'+(document.getElementById('txtCodigoMaquina') as HTMLInputElement).value
  this.dBConectionService.addMaquina(serviceModelMaquina).subscribe((res) => {
    if (res) {
console.log(res)

      Swal.fire({
        title: 'Registro de máquina',
        text: "¡¡Presione el botón para confirmar!!",
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: 'rgb(255, 194, 28)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok,volver'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Registro exitoso!',
            'success',

          ),
          //
          this.onDataTable3();
          this.clearCampos();
        }
      })


    } else {
      alert('Error! :(')

    }
  })
}

  }

  onAddSolicitudDispositivo(serviceModelDispositivo: ServiceModelDispositivo): void {
    let valor='i'
    let valor2
    let valor3
    for(let item of this.datatable6){
     valor2=item.maquina
     valor3=item.nombre
      if( (document.getElementById('txtMaquinaDispositivo') as HTMLInputElement).value === valor2 && (document.getElementById('txtNombreDispositivo') as HTMLInputElement).value === valor3){
      valor='existe'
      }

    }
    if(valor==='existe'){
      this.toastr.error('Este dispositivo ya se encuentra en el sistema!');
    }
    this.dBConectionService.addDispositivo(serviceModelDispositivo).subscribe((res) => {
      if (res) {
console.log(res)

        Swal.fire({
          title: 'Registro de area',
          text: "¡¡Presione el botón para confirmar!!",
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: 'rgb(255, 194, 28)',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok,volver'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Registro exitoso!',
              'success',

            )
            ,
            //
    this.onDataTable6();
this.clearCampos();
          }
        })


      } else {
        alert('Error! :(')

      }
    })
  }
  clearCampos(){
    // this.serviceModel.area = '';
    this.serviceModelDispositivo.nombre='';
    this.serviceModelDispositivo.maquina='';
    this.serviceModelArea.nombre='';
    (document.getElementById('txtNombreMaquina') as HTMLInputElement).value=''
    this.serviceModelMaquina.codigo='';
    this.serviceModelMaquina.area='';
    this.serviceModelMecanico.nombre='';
    this.serviceModelMecanico.nomina='';
    this.serviceModelMaquina.statusMaquina='';


  }
  deleteDispositivos(idDispositivo:number):void{
    Swal.fire({
      title: 'Eliminar dispositivo',
      text: "Este registro será eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.dBConectionService.deleteDispositivo(idDispositivo).subscribe(res=>{
          if(res){
            this.toastr.success(`El dispositivo número ${idDispositivo} se ha eliminado con exito!`);
            this.onDataTable6();
          }
          else{
            alert('error')
          }
         })
      }
    })
  }
  deleteAreas(idArea: number):void{
    Swal.fire({
      title: 'Eliminar área',
      text: "Este registro será eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dBConectionService.deleteArea(idArea).subscribe(res=>{
          if(res){
            this.toastr.success(`El área número ${idArea} se ha eliminado con exito!`);
            this.onDataTable2();
          }
          else{
            alert('error')
          }
         })

      }
    })
  }
  deleteMaquinas(idMaquina:number):void{
    Swal.fire({
      title: 'Eliminar maquina',
      text: "Este registro será eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dBConectionService.deleteMaquina(idMaquina).subscribe(res=>{
          if(res){
            this.toastr.success(`La maquina número ${idMaquina} se ha eliminado con exito!`);
            this.onDataTable3();
          }
          else{
            alert('error')
          }
         })

      }
    })
  }
  deleteMecanicos(IdMecanico:number):void{
    Swal.fire({
      title: 'Eliminar mecánico',
      text: "Este registro será eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.dBConectionService.deleteMecanico(IdMecanico).subscribe(res=>{
        if(res){
          this.toastr.success(`El mecánico número ${IdMecanico} se ha eliminado con exito!`);
          this.onDataTable4();
        }
        else{
          alert('error')
        }
       })

      }
    })
  }

  CambioStatus(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template)
  }

  onUpdateMaquina(serviceModelMaquina:ServiceModelMaquina):void{
    this.dBConectionService.updateMaquina(serviceModelMaquina.idMaquina, serviceModelMaquina).subscribe(res => {
      if(res){
        this.toastr.info(`La máquina número ${serviceModelMaquina.idMaquina} se ha modificado con exito!`);
        this.onDataTable3();
        this.bsModalRef.hide()
      } else {
        alert('Error! :(')
      }
    });
  }
 

}
