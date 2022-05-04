import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { environment } from 'src/environments/environment';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<Heroe[]> {
     return this.http.get<Heroe[]>(`${url}/heroes`);
  }

  public getHeroeById(id: string): Observable<Heroe>{
    return this.http.get<Heroe>(`${url}/heroes/${id}`);
  }

  public getHeroeByName(name: string): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${url}/heroes?q=${name}`);
  }

  public gravarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${url}/heroes`, heroe );
  }

  public alterarHeroe(heroe: Heroe): Observable<Heroe> {
      return this.http.put<Heroe>(`${url}/heroes/${heroe.id}`, heroe);
  }

  public deleteHeroe(heroe: Heroe): Observable<void> {
    return this.http.delete<void>(`${url}/heroes/${heroe.id}`);
  }


}
