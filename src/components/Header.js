import React from "react";
import { Text, Image, View } from "react-native";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        marginLeft: 20,
      }}
    >
      <Image
        source={require("../../assets/images/Pokeball.png")}
        style={{
          width: 35,
          height: 35,
          margin: 8,
          marginTop: 12,
          marginRight: 12,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontFamily: "PoppinsBold",
          marginTop: 7,
        }}
      >
        Pokédex
      </Text>
    </View>
  );
};

export default Header;