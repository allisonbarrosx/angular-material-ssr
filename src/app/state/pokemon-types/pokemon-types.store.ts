import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PokemonType } from './pokemon-type.model';

export interface PokemonTypesState extends EntityState<PokemonType> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'PokemonTypes'
})
export class PokemonTypesStore extends EntityStore<PokemonTypesState> {

  constructor() {
    super();
  }

}
