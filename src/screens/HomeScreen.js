import React from "react";
import { Text, View, Image, FlatList } from "react-native";

const HomeScreen = ({ route }) => {
  const { pokemonsList } = route.params;

  return (
    <View>
      <FlatList
        data={pokemonsList}
        keyExtractor={(pokemon) => pokemon.id}
        renderItem={({ item }) => {
          const spriteUrl = item.sprite + item.id + ".png";

          return (
            <View>
              <Text>{item.sprite}</Text>
              <Text>{item.id}</Text>
              <Text>{item.nome}</Text>
              <Text>{item.url}</Text>
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
