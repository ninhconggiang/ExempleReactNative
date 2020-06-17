import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View } from "react-native";
import styles from "./Styles/ShapeStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Shape) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Shape", () => <Shape />);

class Shape extends Component {
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
    size: PropTypes.number,
    type: PropTypes.oneOf(["circle"]).isRequired,
    color: PropTypes.string
  };

  // Set default prop values
  static defaultProps = {
    color: "red"
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { size, type, color } = this.props;
    switch (type) {
      case "circle":
        return (
          <View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color
            }}
          />
        );
        break;
      default:
        return <View />;
    }
  }
}

export default Shape;
