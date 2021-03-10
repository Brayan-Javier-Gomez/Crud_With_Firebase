import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  url = 'https://login-82124-default-rtdb.firebaseio.com';


  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((res: any) => {
          heroe.id = res.name;
          return heroe;
        })
      )
  }

  actualizarHeroe(heroe: HeroeModel) {

    const heroeTempporal = {
      ...heroe
    };
    delete heroeTempporal.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTempporal);
  }

  getHeroes() {

    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(this.crearArreglo),
        delay(500)
      )
  }


  borrarHeroe(id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroeID(id: string) {

    return this.http.get(`${this.url}/heroes/${id}.json`);

  }
  private crearArreglo(heroesObj: object) {

    const heroes: HeroeModel[] = [];


    if (heroesObj == null) {
      return [];
    }

    Object.keys(heroesObj).forEach(key => {

      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);

    });


    return heroes;
  }



}

