import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { PokemonTypeResult } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly _baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private readonly _httpClient: HttpClient) {}

  getPokemonTypes() {
    return this._httpClient.get<PokemonTypeResult>('type').pipe(
      map((result) => result.results),
      shareReplay(1)
    );
  }
}
