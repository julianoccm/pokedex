import React from "react";
import { Text, Image, View } from "react-native";

const Loading = () => {
  return (
    <View style={{ backgroundColor: "#181b1d", flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image
          source={require("../../assets/images/Pokeball-Loading.gif")}
          style={{
            width: 400,
            height: 400,
          }}
        />
        <Text
          style={{
            fontSize: 22,
            color: "white",
            textAlign: "center",
            marginHorizontal: 10,
            marginBottom: 60,
          }}
        >
          Estamos acessando a base de dados do professor Carvalho, aguarde um
          instante...
        </Text>
      </View>
    </View>
  );
};

export default Loading;
