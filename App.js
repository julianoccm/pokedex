import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { getPokemonBasicOffset } from "./src/api/PokeAPI";

//Screen's
import Home from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  const [pokemonsList, setPokemonsList] = useState([]);

  useEffect(() => {
    getPokemonBasicOffset(1, 12).then((data) => {
      setPokemonsList(() => data.sort((a, b) => a.id - b.id));
    });
  }, []);

  if (pokemonsList.length != 12) return <Text>Carregando...</Text>;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{ pokemonsList }}
        />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
