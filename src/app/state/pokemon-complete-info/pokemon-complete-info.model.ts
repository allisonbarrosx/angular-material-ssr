import { ID } from '@datorama/akita';

export interface PokemonCompleteInfo {
  id: ID;
  name: string;
  type: string;
  sprites: { front_default: string };
}

export function createPokemonCompleteInfo(
  params: Partial<PokemonCompleteInfo>
) {
  return {} as PokemonCompleteInfo;
}
