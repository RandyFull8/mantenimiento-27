import { Component, OnInit } from '@angular/core';
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

  datatable: any = []
  datatable2: any = []
  datatable3: any = []
  datatable4: any = []
  datatable5: any = []
  datatable6: any = []
  constructor(private toastr: ToastrService,private Outh:OuthService,public route: ActivatedRoute,private router: Router,private dBConectionService: DBConectionService,_CargarScriptsService:CargarScriptsService) { _CargarScriptsService.carga(['time']), _CargarScriptsService.carga(['NabBarFunctions'])}
  ngOnInit(): void {

    this.onDataTable();
    this.onDataTable2();
    this.onDataTable3();
    this.onDataTable4();
    this.onDataTable5();
    this.onDataTable6();
  }
  onDataTable(){
    this.dBConectionService.getSolicitud().subscribe(res=>{
  this.datatable=res;

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
    this.Outh.logoutAdmin()
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
            this.onDataTable();
    this.onDataTable2();
    this.onDataTable3();
    this.onDataTable4();
    this.onDataTable5();
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
    this.serviceModelMaquina.nombre='';
    this.serviceModelMaquina.codigo='';
    this.serviceModelMaquina.area='';
    this.serviceModelMecanico.nombre='';
    this.serviceModelMecanico.nomina='';
    this.serviceModelMaquina.statusMaquina='';


  }



}
