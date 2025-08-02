import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonType } from '../../models/pokemon.model';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

const matImports = [MatCardModule, MatButton, MatTabsModule];

@Component({
  selector: 'app-home-page',
  imports: [...matImports, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  pokemonTypeList = signal<PokemonType[]>([]);

  constructor(private readonly _service: PokemonService) {
    this._service
      .getPokemonTypes()
      .subscribe((res) => this.pokemonTypeList.set(res));
  }
}
