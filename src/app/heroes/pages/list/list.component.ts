import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { HeroesService } from './../../services/heroes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  heroes: Heroe[] = [];
  hasError: boolean = false;

  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(
      ( res: Heroe[] ) => {
        this.hasError = false;
        this.heroes = res;

      },
      ( err ) =>  this.hasError = true,
    )
  }

}
