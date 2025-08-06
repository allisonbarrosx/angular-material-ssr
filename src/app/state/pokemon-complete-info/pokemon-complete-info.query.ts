import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import {
  PokemonCompleteInfoStore,
  PokemonCompleteInfoState,
} from './pokemon-complete-info.store';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonCompleteInfoQuery extends QueryEntity<PokemonCompleteInfoState> {
  constructor(store: PokemonCompleteInfoStore) {
    super(store);
  }

  isEmptyByType$(type: string): Observable<boolean> {
    return this.selectCount((pokemon) => pokemon.type === type).pipe(
      map((count) => count === 0)
    );
  }

  getListByType$(type: string) {
    return this.selectAll({ filterBy: (s) => s.type === type });
  }
}
