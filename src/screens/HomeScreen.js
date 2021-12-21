import React, { useState } from "react";
import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";

import { getPokemons } from "../api/PokeAPI";

let PAGE = 12;

const HomeScreen = ({ route }) => {
  const [pokemonsList, setPokemonsList] = useState(route.params.pokemonsList);

  return (
    <View style={{ marginBottom: 80 }}>
      <TouchableOpacity
        style={{ backgroundColor: "#8259e3", padding: 10, margin: 8 }}
        onPress={() => {
          getPokemons(PAGE).then((data) => setPokemonsList(data));
          PAGE += 12;
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Proximo</Text>
      </TouchableOpacity>

      <FlatList
        data={pokemonsList}
        keyExtractor={(pokemon) => pokemon.id}
        renderItem={({ item }) => {
          const spriteUrl = item.sprite + item.id + ".png";

          return (
            <View style={{ borderWidth: 2, margin: 2, padding: 5 }}>
              <Text>{item.id}</Text>
              <Text>{item.nome}</Text>
              <Image
                source={{ uri: spriteUrl }}
                style={{ width: 50, height: 50 }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;
