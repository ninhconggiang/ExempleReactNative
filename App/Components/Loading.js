import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View } from "react-native";
import styles from "./Styles/LoadingStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from "react-native-spinkit";
import LottieView from 'lottie-react-native';
// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Loading) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Loading", () => <Loading />);

class Loading extends Component {
  // Define prop types
  static propTypes = {
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
    type: PropTypes.oneOf([
      "CircleFlip",
      "Bounce",
      "Wave",
      "WanderingCubes",
      "Pulse",
      "ChasingDots",
      "ThreeBounce",
      "Circle",
      "9CubeGrid",
      "WordPress",
      "FadingCircle",
      "FadingCircleAlt",
      "Arc",
      "ArcAlt",
      "LottieSearching"
    ])
  };

  // Set default prop values
  static defaultProps = {
    type: "ThreeBounce"
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { type, style } = this.props;
    if(type === "LottieSearching") {
      return (<LottieView
        source={require('../Images/lottie/lottie_search.json')}
        autoPlay
        loop
        style={{ width: '50%', alignSelf: 'center' }}/>);
    }
    return (
      <View>
        <Spinner
          style={[{}, style]}
          isVisible={true}
          //size={10}
          type={type}
          color={"black"}
        />
      </View>
    );
  }
}

export default Loading;
