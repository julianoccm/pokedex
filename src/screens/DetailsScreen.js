import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  View,
  LogBox,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { getPokemonByName, getEvolutionsByName } from "../api/PokeAPI";
import {
  AboutValueText,
  InfoContainer,
  PokemonHeaderInfo,
  PokemonID,
  PokemonName,
  SubTitle,
  Title,
  TypeTag,
  TypeTagContainer,
} from "../styles/DetailsScreenStyles";

import StatsItem from "../components/StatsItem";
import Loading from "../components/Loading";

let scrollViewRef;

const DetailsScreen = ({ route, navigation }) => {
  const [pokemonName, setPokemonName] = useState(route.params.nome);
  const [evolutions, setEvolutions] = useState(null);
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    getPokemonByName(pokemonName).then((data) => {
      if (data !== undefined) {
        setPokemonInfo(data);
      }
    });
    getEvolutionsByName(pokemonName).then((data) => setEvolutions(data));
  }, [pokemonName]);

  if (pokemonInfo == null || evolutions == null) return <Loading />;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: pokemonInfo.tipoPrincipal.cor }}
      ref={(ref) => (scrollViewRef = ref)}
    >
      <PokemonHeaderInfo>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name={"arrowleft"} size={28} color="#FFF" />
          </TouchableOpacity>
          <PokemonName>{pokemonInfo.renderName}</PokemonName>
        </View>
        <PokemonID>#{pokemonInfo.id}</PokemonID>
      </PokemonHeaderInfo>

      <Image
        source={require("../../assets/images/Pokeball-White.png")}
        style={{
          width: 250,
          height: 250,
          position: "absolute",
          zIndex: -1,
          right: 10,
          top: 20,
        }}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Image
          source={{ uri: pokemonInfo.sprite }}
          style={{ height: 270, width: 270, zIndex: 1 }}
        />
      </View>

      <InfoContainer>
        <TypeTagContainer>
          <TypeTag
            style={{ textAlignVertical: "center" }}
            tagColor={pokemonInfo.tipoPrincipal.cor}
          >
            {pokemonInfo.tipoPrincipal.nome}
          </TypeTag>
          {pokemonInfo.tipoSecundario != null ? (
            <TypeTag
              style={{ textAlignVertical: "center" }}
              tagColor={pokemonInfo.tipoSecundario.cor}
            >
              {pokemonInfo.tipoSecundario.nome}
            </TypeTag>
          ) : null}
        </TypeTagContainer>

        <View style={{ marginTop: 20 }}>
          <Title textColor={pokemonInfo.tipoPrincipal.cor}>Sobre</Title>

          <View
            style={{ flexDirection: "row", alignSelf: "center", marginTop: 10 }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/images/Balanca.png")}
                  style={{ height: 20, width: 20, marginRight: 15 }}
                />
                <AboutValueText>{pokemonInfo.peso} kg</AboutValueText>
              </View>
              <SubTitle>Peso</SubTitle>
            </View>

            <Image
              source={require("../../assets/images/Divider.png")}
              style={{ height: 30, width: 3, marginHorizontal: 25 }}
            />

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/images/Regua.png")}
                  style={{ height: 30, width: 15, marginRight: 15 }}
                />
                <AboutValueText>{pokemonInfo.altura} m</AboutValueText>
              </View>
              <SubTitle>Altura</SubTitle>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Title textColor={pokemonInfo.tipoPrincipal.cor}>Habilidades</Title>

          <FlatList
            data={pokemonInfo.habilidades}
            keyExtractor={(habilidade) => habilidade.ability.name}
            renderItem={({ item }) => {
              return (
                <AboutValueText>
                  {item.ability.name.charAt(0).toUpperCase() +
                    item.ability.name.slice(1)}
                </AboutValueText>
              );
            }}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Title textColor={pokemonInfo.tipoPrincipal.cor}>
            Status Básicos
          </Title>
          <View style={{ margin: 10 }}>
            <StatsItem
              cor={pokemonInfo.tipoPrincipal.cor}
              value={pokemonInfo.status.hp}
              title="HP"
            />
            <StatsItem
              cor={pokemonInfo.tipoPrincipal.cor}
              value={pokemonInfo.status.attack}
              title="ATK"
            />
            <StatsItem
              cor={pokemonInfo.tipoPrincipal.cor}
              value={pokemonInfo.status.defense}
              title="DEF"
            />
            <StatsItem
              cor={pokemonInfo.tipoPrincipal.cor}
              value={pokemonInfo.status.specialAttack}
              title="ATKS"
            />
            <StatsItem
              cor={pokemonInfo.tipoPrincipal.cor}
              value={pokemonInfo.status.specialDefense}
              title="DEFS"
            />
            <StatsItem
              cor={pokemonInfo.tipoPrincipal.cor}
              value={pokemonInfo.status.speed}
              title="VEL"
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Title textColor={pokemonInfo.tipoPrincipal.cor}>Evoluções</Title>

          <FlatList
            horizontal
            data={evolutions}
            style={{ marginTop: 5 }}
            keyExtractor={(pokemon) => pokemon.id}
            ItemSeparatorComponent={() => {
              return (
                <View style={{ justifyContent: "center", marginHorizontal: 2 }}>
                  <AntDesign name={"arrowright"} size={25} color="#666" />
                </View>
              );
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setPokemonName(item.nome);
                    scrollViewRef.scrollTo({ y: 0, animated: true });
                  }}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Image
                    source={{ uri: item.sprite }}
                    style={{ width: 80, height: 80 }}
                  />
                  <AboutValueText style={{ fontSize: 17 }}>
                    {item.renderName}
                  </AboutValueText>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </InfoContainer>
    </ScrollView>
  );
};

export default DetailsScreen;
