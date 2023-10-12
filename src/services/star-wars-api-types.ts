export type CharacterType = {
    name: string;
    gender: string;
    vehicles: string[];
    homeworld: string;
    avatar?: string;
    url: string;
  };

  export type  CharacterResponseType = {
    results: CharacterType[];
    count: number;
    next: string | null;
    previous: string | null;
  };

  export type PlanetResponseType = {
    name: string;
    population: string;
    residents: string[];
  }

  export type VehicleResponseType = {
    name: string;
    model: string;
    pilots: string[];
  }
  