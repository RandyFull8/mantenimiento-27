import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../../services/cargar-scripts.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  datatable: any = []
  public load: boolean;
  constructor(_CargarScriptsService:CargarScriptsService) {
    this.load = false;
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.load = true;
    }, 1600);


  }

}
