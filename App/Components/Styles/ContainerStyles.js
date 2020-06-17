import { StyleSheet, StatusBar, Platform } from "react-native";
import { Metrics, Colors, Fonts } from "../../Themes/";
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export default StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  },
  appBar: {
    backgroundColor: "#79B45D",
    height: APPBAR_HEIGHT
  }
});
