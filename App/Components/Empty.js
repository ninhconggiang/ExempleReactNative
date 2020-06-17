import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View, Text } from "react-native";
import styles from "./Styles/EmptyStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
import LottieView from "lottie-react-native";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Empty) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Empty", () => <Empty />);

class Empty extends Component {
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
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  // Set default prop values
  static defaultProps = {};

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {} = this.props;
    return (
      <View style={{ alignItems: 'center' }}>
        <LottieView
          source={require("../Images/lottie/lottie_empty_box.json")}
          autoPlay
          loop
          style={{ width: '50%'}}
        />
        <Text style={{ color: '#474747' }}>Danh sách trống</Text>
      </View>
    );
  }
}

export default Empty;
