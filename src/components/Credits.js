import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const creditsAlert = () => {
  Alert.alert("Criado por:", "Juliano Colere Ceccon Moreira\n2021", [
    { text: "OK" },
  ]);
};

const Credits = () => {
  return (
    <TouchableOpacity
      style={{
        marginRight: 20,
        marginTop: 5,
      }}
      onPress={creditsAlert}
    >
      <FontAwesome name="question" size={33} color="black" />
    </TouchableOpacity>
  );
};

export default Credits;
