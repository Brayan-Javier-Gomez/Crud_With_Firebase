import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();



  constructor(private heroesService: HeroesService,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    console.log(id);

   

    if (id !== 'nuevo') {
      this.heroesService.getHeroeID(id).subscribe((res: HeroeModel) => {
        Swal.fire({
          icon: 'info',
          title: 'Espere por favor',
          allowOutsideClick : false
        });
        Swal.showLoading();
        console.log(res);
        this.heroe = res;
        this.heroe.id = id;
        Swal.close();
      });
    }


  }



  guardar(form: NgForm): any {

    if (form.invalid) {
      console.log('formulario invalido');
      return;
    }
    Swal.fire({
      title: 'Guardando',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
      
    }

    peticion.subscribe(res => {
      console.log(res);
      Swal.fire({
        title: this.heroe.nombre,
        text: 'El Heroe se ha guardado correctamente',
        icon: 'success',

      });
    })

  }
}
