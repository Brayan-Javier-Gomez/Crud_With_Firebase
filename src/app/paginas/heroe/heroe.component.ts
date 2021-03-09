import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();



  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }


  guardar(form: NgForm): any {
    if (form.invalid) {
      console.log('formulario invalido');
      return;
    }
    this.heroesService.crearHeroe(this.heroe).subscribe(res => {
      console.log(res);
    });
  }
}
