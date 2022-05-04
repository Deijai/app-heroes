import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from 'src/app/interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    publisher: Publisher.DCComics,
    first_appearance: '',
    alt_img: '',
  };
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  delete: boolean = false;

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroeById(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  gravar() {
    if (this.heroe.superhero.trim().length === 0) return;

    if (this.heroe.id) {
      console.log('editar');
      this.heroeService.alterarHeroe(this.heroe).subscribe((heroe) => {
        this.heroe = heroe;
        this.openSnackBar(`${this.heroe.superhero} alterado com sucesso!`);
      });
    } else {
      this.heroeService.gravarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['heroes/edit', heroe.id]);
        this.openSnackBar(`${this.heroe.superhero} criado com sucesso!`);
      });
    }
  }

  deletar() {
    const dialog = this.dialog.open(DialogComponent, {
      width: '350px',
      data: this.heroe,
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.heroeService.deleteHeroe(this.heroe).subscribe((resp) => {
          this.openSnackBar(`${this.heroe.superhero} deletado com sucesso!`);
          this.router.navigate(['/heroes/list']);
        });
      }
    });
  }

  private openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Fechar', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
