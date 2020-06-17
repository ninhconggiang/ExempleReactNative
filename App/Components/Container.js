import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground
} from "react-native";
import styles from "./Styles/ContainerStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Container) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Container", () => <Container />);

class Container extends Component {
  // Define prop types
  static propTypes = {
    backgroundColor:PropTypes.string,
    colorSafeArea:PropTypes.string,
    backgroundImage: PropTypes.any,
    hideStatusBar: PropTypes.bool,
    statusBarColor: PropTypes.string,
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
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf["primary", "secondary"],
  };

  // Set default prop values
  static defaultProps = {
    type:"primary",
    hideStatusBar: false,
    statusBarColor: '#ffffff',
    colorSafeArea:'#273069'
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children, backgroundImage, hideStatusBar, style, statusBarColor,type ,backgroundColor} = this.props;
    return (
      <>
      <SafeAreaView 
      style={[{
        flex:0, 
        backgroundColor
      },
      style,
      {
        ...type === "primary" ? {
          backgroundColor: '#fff',
        } : {
          backgroundColor:'#273069'
        }
      }
    ]}
      ></SafeAreaView>
      <SafeAreaView style={[{ flex: 1, backgroundColor: "white" }, style]}>
        {Boolean(hideStatusBar) ? (
          <StatusBar hidden />
        ) : (
            <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
          )}
        {backgroundImage ? (
          <ImageBackground
            source={backgroundImage}
            style={{ flex: 1, height: "100%" }}
          >
            {children}
          </ImageBackground>
        ) : (
            <View style={{ flex: 1, backgroundColor: "transparent" }}>
              {children}
            </View>
          )}
      </SafeAreaView>
      </>
    );
  }
}

export default Container;
