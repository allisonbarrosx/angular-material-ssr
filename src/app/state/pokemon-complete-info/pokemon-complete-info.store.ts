import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PokemonCompleteInfo } from './pokemon-complete-info.model';

export interface PokemonCompleteInfoState extends EntityState<PokemonCompleteInfo> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'PokemonCompleteInfo'
})
export class PokemonCompleteInfoStore extends EntityStore<PokemonCompleteInfoState> {

  constructor() {
    super();
  }

}
