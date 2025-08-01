export type PokemonTypeResult = {
  count: number;
  next: string;
  previous: string;
  results: PokemonType[];
};

export type PokemonType = {
  name: string;
  url: string;
};
