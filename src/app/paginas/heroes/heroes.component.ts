import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { HeroeService } from '../../services/heroe.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe(res => {
      this.heroes = res;
      console.log(this.heroes);
      this.cargando = false;
    })
  }


  borrar(heroe: HeroeModel , i: number){
   Swal.fire({
     title: '¿Estas seguro?',
     text: `Estas seguro de borrar ${heroe.nombre}`,
    icon: 'question',
    showCancelButton : true,
    showConfirmButton : true,
   }).then(res =>{
     this.heroes.splice(i , 1);
     this.heroesService.borrarHeroe(heroe.id).subscribe();
   })
  }

}
