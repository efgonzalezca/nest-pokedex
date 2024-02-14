import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  private readonly http: AxiosAdapter;
  private readonly pokemonModel: Model<Pokemon>;

  constructor(
    @InjectModel(Pokemon.name)
    pokemonModel: Model<Pokemon>,
    http: AxiosAdapter,
  ) {
    this.pokemonModel = pokemonModel;
    this.http = http;
  }

  async executeSeed() {
    const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=650`);
    const pokemonToInsert: {name: string, no: number}[] = [];
    
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonToInsert.push({name: name, no: no}) 
    })
    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed Executed';
  }
}
