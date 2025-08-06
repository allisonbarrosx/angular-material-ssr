import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { PokemonTypesStore } from './pokemon-types.store';
import { PokemonTypeResult } from '../../models/pokemon.model';
import { setLoading } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class PokemonTypesService {
  constructor(
    private pokemonTypesStore: PokemonTypesStore,
    private http: HttpClient
  ) {}

  getPokemonTypesList() {
    return this.http.get<PokemonTypeResult>('type').pipe(
      setLoading(this.pokemonTypesStore),
      map((entities) => entities.results.map((p) => ({ ...p, id: p.name }))),
      tap((entities) => this.pokemonTypesStore.set(entities))
    );
  }
}
