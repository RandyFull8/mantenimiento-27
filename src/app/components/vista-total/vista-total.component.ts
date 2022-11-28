
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
  selector: 'app-vista-total',
  templateUrl: './vista-total.component.html',
  styleUrls: ['./vista-total.component.css']
})
export class VistaTotalComponent implements OnInit {

   /**Servicios */
   serviceModel: ServiceModel = new ServiceModel()

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
   refresh(): void {
    window.location.reload(); }


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

             }
           })


         } else {
           alert('Error! :(')

         }
       })
     }

   }














 }
