import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PokemonType } from '../../models/pokemon.model';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { PokemonTypesQuery, PokemonTypesService } from '../../state';

const matImports = [MatCardModule, MatButton, MatTabsModule];

@Component({
  selector: 'app-home-page',
  imports: [...matImports, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private _service = inject(PokemonTypesService);
  private _query = inject(PokemonTypesQuery);

  pokemonTypeList = signal<PokemonType[] | undefined>([]);

  constructor() {
    this._query.isEmpty$.subscribe((isEmpty) => {
      if (isEmpty) {
        this._service.getPokemonTypesList().subscribe();
      } else {
        this.pokemonTypeList.set(this._query.pokemonTypes());
      }
    });
  }
}
