import {
  AfterViewInit,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../../services/pokemon.service';
import { PokemonCompleteInfo } from '../../../models/pokemon.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-type-list',
  imports: [
    MatTableModule,
    MatPaginator,
    MatProgressSpinnerModule,
    MatSortModule,
  ],
  templateUrl: './type-list.html',
  styleUrl: './type-list.scss',
})
export class TypeList implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  private activatedRoute = inject(ActivatedRoute);

  pokemonType = signal<string>('');
  pokemonList = new MatTableDataSource<PokemonCompleteInfo>([]);
  displayedColumns: string[] = ['id', 'name', 'sprites'];
  progression = 0;

  constructor(private readonly _service: PokemonService) {
    this.activatedRoute.params
      .pipe(
        map((params) => params['name']),
        distinctUntilChanged(),
        filter((name) => !!name),
        tap(() => (this.progression = 0)),
        switchMap((name) => this._service.getPokemonsByType(name))
      )
      .subscribe((res) => {
        this.pokemonList.data = res;
        this.progression = 100;
      });
  }

  ngAfterViewInit() {
    this.pokemonList.paginator = this.paginator;
    this.pokemonList.sort = this.sort;
  }
}
