import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";

import { getBasicPokemonByNameId, getPokemonBasicOffset } from "../api/PokeAPI";

import ErrorComponent from "../components/ErrorComponent";
import PokeCard from "../components/PokeCard";
import SearchBar from "../components/SearchBar";
import ButtonPokedex from "../components/ButtonPokedex";

let PAGE = 13;
let PREVIUS_PAGE = 0;
let pokemonsListRef;

const HomeScreen = ({ route, navigation }) => {
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [goSearch, setGoSearch] = useState(false);
  const [pokemonsList, setPokemonsList] = useState(route.params.pokemonsList);

  const clearStates = () => {
    setPokemonsList(route.params.pokemonsList);
    setError(false);
    setGoSearch(false);
    setSearch("");
    PAGE = 13;
    PREVIUS_PAGE = 0;
  };

  useEffect(() => {
    if (search !== "") {
      getBasicPokemonByNameId(search.toLowerCase()).then((data) => {
        if (data !== undefined) {
          setPokemonsList([data]);
          setError("");
        } else setError(true);
      });
      setGoSearch(false);
    }
  }, [goSearch]);

  return (
    <View style={{ marginBottom: 140 }}>
      <SearchBar
        value={search}
        onChangeText={(value) => {
          setSearch(value);
          if (value == "") clearStates();
        }}
        onEndEditing={() => setGoSearch(true)}
        placeholder="Digite o nome ou id"
      />

      {error || pokemonsList.length == 1 ? (
        <View style={{ height: 48 }}>
          <ButtonPokedex text="Voltar" onPress={clearStates} />
        </View>
      ) : (
        <View
          style={{ flexDirection: "row", justifyContent: "center", height: 48 }}
        >
          <ButtonPokedex
            showArrow={true}
            arrowDirection="left"
            onPress={() => {
              pokemonsListRef.scrollToOffset({ offset: 0, animated: true });

              if (PREVIUS_PAGE <= 0) {
                clearStates();
                return;
              }

              getPokemonBasicOffset(PREVIUS_PAGE - 11, PREVIUS_PAGE).then(
                (data) => {
                  setPokemonsList(() => data.sort((a, b) => a.id - b.id));
                }
              );

              PREVIUS_PAGE -= 12;
              PAGE -= 12;
            }}
          />
          <ButtonPokedex
            showArrow={true}
            arrowDirection="right"
            onPress={() => {
              pokemonsListRef.scrollToOffset({ offset: 0, animated: true });

              getPokemonBasicOffset(PAGE, PAGE + 11).then((data) => {
                setPokemonsList(() => data.sort((a, b) => a.id - b.id));
              });
              PAGE += 12;
              PREVIUS_PAGE += 12;
            }}
          />
        </View>
      )}

      {error ? (
        <ErrorComponent />
      ) : (
        <FlatList
          numColumns={2}
          data={pokemonsList}
          keyExtractor={(pokemon) => pokemon.id}
          ref={(ref) => (pokemonsListRef = ref)}
          renderItem={({ item }) => {
            return (
              <PokeCard
                id={item.id}
                nome={item.nome}
                typeColor={item.typeColor}
                urlImage={item.sprite}
                onPress={() =>
                  navigation.navigate("DetailsScreen", { nome: item.nome })
                }
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default HomeScreen;
