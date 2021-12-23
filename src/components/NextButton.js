import React from "react";
import { AntDesign } from "@expo/vector-icons";

import { NextButtonContainer, NextButtonText } from "../styles/NextButtonStyle";

const NextButton = ({ onPress }) => {
  return (
    <NextButtonContainer onPress={onPress}>
      <NextButtonText>Próxima página</NextButtonText>
      <AntDesign
        name="arrowright"
        size={22}
        color="#666666"
        style={{ marginTop: 5 }}
      />
    </NextButtonContainer>
  );
};

export default NextButton;
