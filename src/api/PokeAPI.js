import axios from "axios";

const PokeAPI = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

const getPokemons = (initial, limit = 12) => {
  return PokeAPI.get("", {
    params: {
      offset: initial,
      limit: limit,
    },
  }).then((response) => {
    return response.data.results.map((element) => {
      return {
        id: element.url
          .replace("https://pokeapi.co/api/v2/pokemon/", "")
          .replace("/", ""),
        nome: element.name,
        url: element.url,
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
      };
    });
  });
};

module.exports = {
  getPokemons,
};

export default PokeAPI;
