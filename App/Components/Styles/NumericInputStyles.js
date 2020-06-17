import { StyleSheet } from "react-native";
import { Metrics, Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  btnLeft: {
    backgroundColor: "#ff6600",
    borderRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 6,
    paddingVertical: 3
  },
  btnRight: {
    backgroundColor: "#ff6600",
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 6,
    paddingVertical: 3
  }
});
