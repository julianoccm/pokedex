import { Text } from "react-native";
import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { getPokemons } from "./src/api/PokeAPI";

//Screen's
import Home from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";

const Stack = createStackNavigator();

export default class App extends Component {
  state = {
    pokemonsList: null,
  };

  componentDidMount() {
    getPokemons(0).then((pokemons) =>
      this.setState({ pokemonsList: pokemons })
    );
  }

  render() {
    if (this.state.pokemonsList == null) return <Text>Carregando...</Text>;

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            initialParams={{ pokemonsList: this.state.pokemonsList }}
          />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
