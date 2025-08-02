import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PokemonType } from './models/pokemon.model';
import { PokemonService } from './services/pokemon.service';

const materialImports = [
  MatToolbar,
  MatIcon,
  MatIconButton,
  MatSidenavModule,
  MatListModule,
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
  pokemonTypeList = signal<PokemonType[]>([]);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(private readonly _service: PokemonService) {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 765px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);

    this._service
      .getPokemonTypes()
      .subscribe((res) => this.pokemonTypeList.set(res));
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
