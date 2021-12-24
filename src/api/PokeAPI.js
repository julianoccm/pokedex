import axios from "axios";
import { handlePokemonType } from "./PokemonTypes";
import { handleStats } from "./PokemonStats";

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
        renderName:
          pokemon.forms[0].name.charAt(0).toUpperCase() +
          pokemon.forms[0].name.slice(1),
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
        renderName:
          pokemon.forms[0].name.charAt(0).toUpperCase() +
          pokemon.forms[0].name.slice(1),
        url: "https://pokeapi.co/api/v2/pokemon/" + pokemon.forms[0].name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        tipoPrincipal: handlePokemonType(pokemon.types[0].type.name),
        tipoSecundario:
          pokemon.types[1] != null
            ? handlePokemonType(pokemon.types[1].type.name)
            : null,
        peso: pokemon.weight / 10,
        altura: pokemon.height / 10,
        habilidades: pokemon.abilities,
        status: handleStats(pokemon.stats),
      };
    })
    .catch((error) => {});
};

const getEvolutionsByName = (pokemonName) => {
  return axios
    .get("https://pokeapi.co/api/v2/pokemon-species/" + pokemonName)
    .then(async (response) => {
      const evolutionChain = response.data.evolution_chain.url;
      let pokemonEvolutionNames;
      let pokemonsList = [];

      await axios.get(evolutionChain).then((res) => {
        let firstPokemon, secondPokemon, thirdPokemon;

        firstPokemon = res.data.chain.species.name;

        res.data.chain.evolves_to.length != 0
          ? (secondPokemon = res.data.chain.evolves_to[0].species.name)
          : (secondPokemon = null);

        res.data.chain.evolves_to.length != 0 &&
        res.data.chain.evolves_to[0].evolves_to.length != 0
          ? (thirdPokemon =
              res.data.chain.evolves_to[0].evolves_to[0].species.name)
          : (thirdPokemon = null);

        pokemonEvolutionNames = [firstPokemon, secondPokemon, thirdPokemon];
      });

      for (let pokemon of pokemonEvolutionNames) {
        if (pokemon != null) {
          await getBasicPokemonByNameId(pokemon).then((data) => {
            pokemonsList.push(data);
          });
        }
      }

      return pokemonsList;
    });
};

module.exports = {
  getPokemonByName,
  getEvolutionsByName,
  getPokemonBasicOffset,
  getBasicPokemonByNameId,
};

export default PokeAPI;
