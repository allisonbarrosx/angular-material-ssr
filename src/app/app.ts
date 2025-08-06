import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import {
  MatButton,
  MatButtonModule,
  MatIconButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PokemonType } from './models/pokemon.model';
import { PokemonTypesQuery, PokemonTypesService } from './state';

const materialImports = [
  MatToolbar,
  MatIcon,
  MatIconButton,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ...materialImports],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  protected title = 'angular-material';
  protected readonly isMobile = signal(true);
  pokemonTypeList = signal<PokemonType[] | undefined>([]);
  sideNavOpened?: boolean;

  private _service = inject(PokemonTypesService);
  private _query = inject(PokemonTypesQuery);
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 765px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);

    this._query.isEmpty$.subscribe((isEmpty) => {
      if (isEmpty) {
        this._service.getPokemonTypesList().subscribe();
      } else {
        this.pokemonTypeList.set(this._query.pokemonTypes());
      }
    });
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
