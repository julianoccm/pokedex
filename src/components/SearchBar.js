import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import {
  SearchBarTextInput,
  SearchBarContainer,
} from "../styles/SearchBarStyle";

const SearchBar = ({ value, onChangeText, onEndEditing, placeholder }) => {
  return (
    <SearchBarContainer>
      <FontAwesome
        name="search"
        size={30}
        color="#666666"
        style={{ marginHorizontal: 10 }}
      />
      <SearchBarTextInput
        value={value}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        placeholder={placeholder}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
