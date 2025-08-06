import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, switchMap, tap, toArray } from 'rxjs/operators';
import { PokemonCompleteInfoStore } from './pokemon-complete-info.store';
import { TypeListPokemons } from '../../models/pokemon.model';
import { PokemonCompleteInfo } from './pokemon-complete-info.model';
import { from } from 'rxjs';
import { PokemonCompleteInfoQuery } from './pokemon-complete-info.query';

@Injectable({ providedIn: 'root' })
export class PokemonCompleteInfoService {
  constructor(
    private pokemonCompleteInfoStore: PokemonCompleteInfoStore,
    private _httpClient: HttpClient,
    private _query: PokemonCompleteInfoQuery
  ) {}

  getPokemonsByType(type: string) {
    return this._httpClient.get<TypeListPokemons>(`type/${type}`).pipe(
      map((pokemonRes) => pokemonRes.pokemon),
      switchMap((pokemons) =>
        from(pokemons).pipe(
          concatMap((p) =>
            this._httpClient
              .get<PokemonCompleteInfo>(`pokemon/${p.pokemon.name}`)
              .pipe(map((res) => ({ ...res, type })))
          ),
          toArray()
        )
      ),
      tap((results) => this.pokemonCompleteInfoStore.add(results))
    );
  }

  getPokemonsByTypeWithCache(type: string) {
    return this._query.isEmptyByType$(type).pipe(
      tap(() => this.pokemonCompleteInfoStore.setLoading(true)),
      switchMap((isEmpty) => {
        if (isEmpty) {
          return this._httpClient.get<TypeListPokemons>(`type/${type}`).pipe(
            map((pokemonRes) => pokemonRes.pokemon),
            switchMap((pokemons) =>
              from(pokemons).pipe(
                concatMap((p) =>
                  this._httpClient
                    .get<PokemonCompleteInfo>(`pokemon/${p.pokemon.name}`)
                    .pipe(map((res) => ({ ...res, type })))
                ),
                toArray()
              )
            ),
            tap((results) => this.pokemonCompleteInfoStore.add(results))
          );
        } else {
          return this._query.getListByType$(type);
        }
      }),
      tap(() => this.pokemonCompleteInfoStore.setLoading(false))
    );
  }
}
