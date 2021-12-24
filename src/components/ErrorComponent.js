import React from "react";
import { Text, View, Image } from "react-native";

const ErrorComponent = () => {
  return (
    <View
      style={{
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/404.png")}
        style={{ width: 350, height: 180 }}
      />
      <Text
        style={{
          fontFamily: "PoppinsBold",
          fontSize: 18,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Ops nenhum Pokémon encontrado, parece que a Equipe Rocket venceu novamente
      </Text>
    </View>
  );
};

export default ErrorComponent;
