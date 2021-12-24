import { View, Image } from "react-native";
import ProgressBar from "./ProgressBar";
import { StatsValueText, StatsTitle } from "../styles/DetailsScreenStyles";

const StatsItem = ({ value, cor, title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginVertical: 1,
      }}
    >
      <View style={{ flexDirection: "row", flex: 2 }}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <StatsTitle textColor={cor}>{title}</StatsTitle>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <StatsValueText>{value}</StatsValueText>
        </View>
      </View>
      <View style={{ width: 200, height: 20 }}>
        <ProgressBar cor={cor} value={value} />
      </View>
    </View>
  );
};

export default StatsItem;
