import React from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  ButtonPokedexContainer,
  ButtonPokedexText,
} from "../styles/ButtonPokedexStyle";

const ButtonPokedex = ({ onPress, arrowDirection, showArrow, text }) => {
  return (
    <ButtonPokedexContainer onPress={onPress}>
      {showArrow ? (
        <AntDesign name={"arrow" + arrowDirection} size={26} color="#666666" />
      ) : null}
      {text != null ? <ButtonPokedexText>{text}</ButtonPokedexText> : null}
    </ButtonPokedexContainer>
  );
};

export default ButtonPokedex;
