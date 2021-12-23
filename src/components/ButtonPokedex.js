import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { ButtonPokedexContainer } from "../styles/ButtonPokedexStyle";

const ButtonPokedex = ({ onPress, arrowDirection }) => {
  return (
    <ButtonPokedexContainer onPress={onPress}>
      <AntDesign name={"arrow" + arrowDirection} size={26} color="#666666" />
    </ButtonPokedexContainer>
  );
};

export default ButtonPokedex;
