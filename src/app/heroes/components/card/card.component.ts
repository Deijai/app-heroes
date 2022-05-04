import { Component, Input, OnInit } from '@angular/core';
import { Heroe, Publisher } from 'src/app/interfaces/heroe.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() heroe!: Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}
