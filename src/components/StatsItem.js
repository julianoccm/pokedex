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
        marginVertical: 1
      }}
    >
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <StatsTitle textColor={cor}>{title}</StatsTitle>
        </View>
        <StatsValueText>{value}</StatsValueText>
      </View>
      <ProgressBar cor={cor} value={value} />
    </View>
  );
};

export default StatsItem;
