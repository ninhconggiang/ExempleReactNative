import { StyleSheet } from "react-native";
import { Metrics, Colors, Fonts } from "../../Themes/";

export default StyleSheet.create({
  vLeftIcon:{
    color:'#fff'
  },
  vHeader: {
    flexDirection: "row",
    marginTop: 8,
    marginHorizontal: 8,
    paddingBottom: 8,
    alignItems: "center"
  },
  txtTitle: {

    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  vRoundedCorner: {
    backgroundColor: "rgba(255,255,255,0.8)",
    height: 70,
    width: 80,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 90,
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  vTitleContainer: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    alignItems: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
