import React from "react";
import { View } from "react-native";

const ProgressBar = ({ value, cor }) => {
  if (value > 100) value = 100;
  
  return (
    <View
      style={{
        width: 200,
        height: 20,
        backgroundColor: "white",
        borderColor: cor,
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 6,
      }}
    >
      <View
        style={{
          width: value * 2,
          height: 17,
          backgroundColor: cor,
          borderRadius: 10,
        }}
      ></View>
    </View>
  );
};

export default ProgressBar;
