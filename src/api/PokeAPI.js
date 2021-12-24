import axios from "axios";
import { handlePokemonType } from "./PokemonTypes";

const PokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

const getBasicPokemonByNameId = (pokemonID) => {
  return PokeAPI.get(pokemonID)
    .then((response) => {
      const pokemon = response.data;

      return {
        id: pokemon.id,
        nome: pokemon.forms[0].name,
        url: "https://pokeapi.co/api/v2/pokemon/" + pokemon.forms[0].name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        typeColor: handlePokemonType(pokemon.types[0].type.name).cor,
      };
    })
    .catch((error) => {});
};

const getPokemonBasicOffset = async (initial, limit) => {
  const pokemons = [];

  const promisse = new Promise(async (resolve, reject) => {
    for (initial; initial <= limit; initial++) {
      await getBasicPokemonByNameId(initial.toString()).then((data) => {
        pokemons.push(data);
      });
    }

    resolve(pokemons);
  });

  return promisse;
};

const getPokemonByName = (pokemonName) => {
  return PokeAPI.get(pokemonName)
    .then((response) => {
      const pokemon = response.data;

      return {
        id: pokemon.id,
        nome: pokemon.forms[0].name,
        url: "https://pokeapi.co/api/v2/pokemon/" + pokemon.forms[0].name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        tipo: handlePokemonType(pokemon.types[0].type.name),
        peso: pokemon.weight,
        altura: pokemon.height,
        abilidade: pokemon.abilities,
      };
    })
    .catch((error) => {});
};

module.exports = {
  getPokemonByName,
  getPokemonBasicOffset,
  getBasicPokemonByNameId,
};

export default PokeAPI;
