import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PokemonTypesStore, PokemonTypesState } from './pokemon-types.store';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class PokemonTypesQuery extends QueryEntity<PokemonTypesState> {
  // pokemonTypes$ = this.selectAll({ asObject: true });
  isEmpty$ = this.selectCount().pipe(map((count) => count === 0));

  readonly pokemonTypes = toSignal(this.selectAll());

  constructor(store: PokemonTypesStore) {
    super(store);
  }
}
