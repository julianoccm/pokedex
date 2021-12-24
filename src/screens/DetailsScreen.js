import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  LogBox,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { getPokemonByName } from "../api/PokeAPI";
import {
  AboutValueText,
  InfoContainer,
  PokemonHeaderInfo,
  PokemonID,
  PokemonName,
  StatsTitle,
  StatsValueText,
  SubTitle,
  Title,
  TypeTag,
  TypeTagContainer,
} from "../styles/DetailsScreenStyles";
import { FlatList } from "react-native-gesture-handler";
import ProgressBar from "../components/ProgressBar";

const DetailsScreen = ({ route, navigation }) => {
  const { nome } = route.params;
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    getPokemonByName(nome).then((data) => {
      if (data !== undefined) {
        setPokemonInfo(data);
      }
    });
  }, []);

  if (pokemonInfo == null) return <Text>Carregando</Text>;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: pokemonInfo.tipoPrincipal.cor }}
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
            <AntDesign name={"arrowleft"} size={34} color="#FFF" />
          </TouchableOpacity>
          <PokemonName>{pokemonInfo.renderName}</PokemonName>
        </View>
        <PokemonID>#{pokemonInfo.id}</PokemonID>
      </PokemonHeaderInfo>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{ uri: pokemonInfo.sprite }}
          style={{ height: 280, width: 280, zIndex: 1 }}
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
                  source={require("../../assets/Balanca.png")}
                  style={{ height: 30, width: 30, marginRight: 15 }}
                />
                <AboutValueText>{pokemonInfo.peso} kg</AboutValueText>
              </View>
              <SubTitle>Peso</SubTitle>
            </View>

            <Image
              source={require("../../assets/Divider.png")}
              style={{ height: 60, width: 3, marginHorizontal: 25 }}
            />

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/Regua.png")}
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
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ alignItems: "center", marginLeft: 12 }}>
              <StatsTitle textColor={pokemonInfo.tipoPrincipal.cor}>
                HP
              </StatsTitle>
              <StatsTitle textColor={pokemonInfo.tipoPrincipal.cor}>
                ATAQUE
              </StatsTitle>
              <StatsTitle textColor={pokemonInfo.tipoPrincipal.cor}>
                DEFESA
              </StatsTitle>
              <StatsTitle textColor={pokemonInfo.tipoPrincipal.cor}>
                ATAQUE S.
              </StatsTitle>
              <StatsTitle textColor={pokemonInfo.tipoPrincipal.cor}>
                DEFESA S.
              </StatsTitle>
              <StatsTitle textColor={pokemonInfo.tipoPrincipal.cor}>
                VELOCIDADE
              </StatsTitle>
            </View>

            <Image
              source={require("../../assets/Divider.png")}
              style={{ height: "98%", width: 3, marginHorizontal: 20 }}
            />

            <View>
              <StatsValueText>{pokemonInfo.status.hp}</StatsValueText>
              <StatsValueText>{pokemonInfo.status.attack}</StatsValueText>
              <StatsValueText>{pokemonInfo.status.defense}</StatsValueText>
              <StatsValueText>
                {pokemonInfo.status.specialAttack}
              </StatsValueText>
              <StatsValueText>
                {pokemonInfo.status.specialDefense}
              </StatsValueText>
              <StatsValueText>{pokemonInfo.status.speed}</StatsValueText>
            </View>

            <View>
              <ProgressBar
                cor={pokemonInfo.tipoPrincipal.cor}
                value={pokemonInfo.status.hp}
              />
              <ProgressBar
                cor={pokemonInfo.tipoPrincipal.cor}
                value={pokemonInfo.status.attack}
              />
              <ProgressBar
                cor={pokemonInfo.tipoPrincipal.cor}
                value={pokemonInfo.status.defense}
              />
              <ProgressBar
                cor={pokemonInfo.tipoPrincipal.cor}
                value={pokemonInfo.status.specialAttack}
              />
              <ProgressBar
                cor={pokemonInfo.tipoPrincipal.cor}
                value={pokemonInfo.status.specialDefense}
              />
              <ProgressBar
                cor={pokemonInfo.tipoPrincipal.cor}
                value={pokemonInfo.status.speed}
              />
            </View>
          </View>
        </View>
      </InfoContainer>
    </ScrollView>
  );
};

export default DetailsScreen;
