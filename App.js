import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import Header from "./src/components/Header";
import Loading from "./src/components/Loading";

import { getPokemonBasicOffset } from "./src/api/PokeAPI";

//Screen's
import Home from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import Credits from "./src/components/Credits";

const Stack = createStackNavigator();

export default function App() {
  const [pokemonsList, setPokemonsList] = useState([]);

  const [loaded] = useFonts({
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    getPokemonBasicOffset(1, 12).then((data) => {
      setPokemonsList(() => data.sort((a, b) => a.id - b.id));
    });
  }, []);

  if (pokemonsList.length != 12 || !loaded) return <Loading />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{ pokemonsList }}
          options={{
            headerLeft: () => <Header />,
            headerRight: () => <Credits />,
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
