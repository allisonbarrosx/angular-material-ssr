import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, from, map, shareReplay, switchMap, toArray } from 'rxjs';
import {
  PokemonCompleteInfo,
  PokemonTypeResult,
  TypeListPokemons,
} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly _httpClient: HttpClient) {}

  getPokemonTypes() {
    return this._httpClient.get<PokemonTypeResult>('type').pipe(
      map((result) => result.results),
      shareReplay(1)
    );
  }

  getPokemonsByType(type: string) {
    return this._httpClient.get<TypeListPokemons>(`type/${type}`).pipe(
      map((pokemonRes) => pokemonRes.pokemon),
      switchMap((pokemons) =>
        from(pokemons).pipe(
          concatMap((p) =>
            this._httpClient.get<PokemonCompleteInfo>(
              `pokemon/${p.pokemon.name}`
            )
          ),
          toArray()
        )
      )
    );
  }
}
