import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { HeroesService } from './../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  pesquisa: string = '';
  heroes: Heroe[] = [];
  heroeSelecionado!: Heroe;
  hasError!: string;


  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {

  }

  pesquisarHeroe(){
    this.heroeService.getHeroeByName(this.pesquisa.trim()).subscribe( heroes => this.heroes = heroes);
  }

  optionSelecionada(event: MatAutocompleteSelectedEvent ) {

    if(!event.option.value) return;

    const heroe: Heroe = event.option.value;
    this.pesquisa = heroe.superhero;

    this.heroeService.getHeroeById(heroe.id!).subscribe(
      (heroe) => this.heroeSelecionado = heroe,
    )
  }

}
