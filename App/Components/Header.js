import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View, ImageBackground, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/HeaderStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';
// import LottieView from "lottie-react-native";

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Header) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Header", () => <Header />);

class Header extends Component {
  // Define prop types
  static propTypes = {
    backgroundColor: PropTypes.string,
    title: PropTypes.string,
    leftComponent: PropTypes.element,
    rightComponent: PropTypes.element,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  // Set default prop values
  static defaultProps = {
    title: "",
    leftComponent: <View />,
    rightComponent: <View />,
    width: "100%",
    height: 140,
    backgroundColor: '#273069'
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { title, leftComponent, rightComponent, width, height, backgroundColor, navigation } = this.props;
    // <ImageBackground
    //     source={require("../Images/bg_header.png")}
    //     style={{ width, height }}
    //   >
    //     </ImageBackground>
    return (
      <View style={{ backgroundColor, height }}>
        {/* <LottieView
          source={require("../Images/lottie/lottie_waves_and_stripe.json")}
          autoPlay
          loop
          style={{ width: "100%", position: "absolute", bottom: 0, left: 0 }}
        /> */}
        <View style={styles.vHeader}>
          <TouchableOpacity 
           onPress={() => { navigation.goBack() }}
          >
            {leftComponent}
          </TouchableOpacity>
          <View style={styles.vTitleContainer}>
            <Text style={styles.txtTitle}>{title}</Text>
          </View>

          <TouchableOpacity>
            {rightComponent}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Header;
