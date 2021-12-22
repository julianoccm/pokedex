import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { getPokemons, getBasicPokemonByName } from "../api/PokeAPI";

let PAGE = 12;

const HomeScreen = ({ route, navigation }) => {
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [goSearch, setGoSearch] = useState(false);
  const [pokemonsList, setPokemonsList] = useState(route.params.pokemonsList);

  const clearStates = () => {
    setPokemonsList(route.params.pokemonsList);
    setError("");
    setGoSearch(false);
    PAGE = 12;
  };

  useEffect(() => {
    if (search !== "") {
      getBasicPokemonByName(search.toLowerCase()).then((data) => {
        if (data !== undefined) {
          setPokemonsList([data]);
          setError("");
        } else setError("Pokemon não encontrado");
      });
      setGoSearch(false);
    }
  }, [goSearch]);

  return (
    <View style={{ marginBottom: 140 }}>
      <TouchableOpacity
        style={{ backgroundColor: "#8259e3", padding: 10, margin: 8 }}
        onPress={() => {
          getPokemons(PAGE).then((data) => setPokemonsList(data));
          PAGE += 12;
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Proximo</Text>
      </TouchableOpacity>

      <TextInput
        value={search}
        onChangeText={(value) => {
          setSearch(value);
          if (value == "") clearStates();
        }}
        onEndEditing={() => setGoSearch(true)}
        placeholder="Digite o nome do pokemon"
        style={{ backgroundColor: "grey", margin: 8, padding: 10 }}
      />

      {error != "" ? (
        <Text style={{ margin: 8, color: "red", fontSize: 18 }}>{error}</Text>
      ) : null}

      <FlatList
        data={pokemonsList}
        keyExtractor={(pokemon) => pokemon.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ borderWidth: 2, margin: 8, padding: 5 }}
              onPress={() => navigation.navigate("DetailsScreen", {nome: item.nome})}
            >
              <Text>{item.id}</Text>
              <Text>{item.nome}</Text>
              <Image
                source={{ uri: item.sprite }}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;