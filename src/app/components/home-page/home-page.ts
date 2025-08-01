import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonType } from '../../models/pokemon.model';

const matImports = [
  MatCard,
  MatCardHeader,
  MatCardSubtitle,
  MatCardContent,
  MatCardActions,
  MatCardTitle,
  MatButton,
];

@Component({
  selector: 'app-home-page',
  imports: [...matImports],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  fakeQty = [1, 2, 3];

  pokemonTypeList = signal<PokemonType[]>([]);

  constructor(private readonly _service: PokemonService) {
    this._service
      .getPokemonTypes()
      .subscribe((res) => this.pokemonTypeList.set(res));
  }
}
