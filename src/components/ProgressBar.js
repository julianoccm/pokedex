import React from "react";
import { View } from "react-native";

const ProgressBar = ({ value, cor }) => {
  if (value >= 100) value = 100;

  return (
    <View
      style={{
        height: 20,
        flex: 1,
        backgroundColor: "white",
        borderColor: cor,
        borderWidth: 2,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: value * 2,
          height: "106%",
          backgroundColor: cor,
          borderRadius: 10,
        }}
      ></View>
    </View>
  );
};

export default ProgressBar;