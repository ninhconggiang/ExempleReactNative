import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View } from "react-native";
import styles from "./Styles/DividerStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Divider) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Divider", () => <Divider />);

class Divider extends Component {
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
    vertical: PropTypes.bool,
    color: PropTypes.string
  };

  // Set default prop values
  static defaultProps = {
    vertical: false
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { style, width, height, vertical, color } = this.props;
    return (
      <View
        style={[
          styles.divider,
          {
            ...(vertical ? { height: "100%", width: 1 } : {}),
            ...(color ? { backgroundColor: color } : {}),
          },
          {
            width: width || (vertical? 1 : styles.divider.width),
            height: height || (vertical? "100%" : styles.divider.height)
          },
          style
        ]}
      />
    );
  }
}

export default Divider;
