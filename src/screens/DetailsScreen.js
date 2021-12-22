import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import { getPokemonByName } from "../api/PokeAPI";

const DetailsScreen = ({ route }) => {
  const { nome } = route.params;
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    getPokemonByName(nome).then((data) => {
      if (data !== undefined) {
        setPokemonInfo(data);
      }
    });
  }, []);

  return <Text>{JSON.stringify(pokemonInfo)}</Text>;
};

export default DetailsScreen;
