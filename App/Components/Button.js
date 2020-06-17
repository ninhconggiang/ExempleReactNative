import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View, TouchableOpacity, Text } from "react-native";
import styles from "./Styles/ButtonStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Button) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Button", () => <Button />);

/**
 * Generate shadow to your view
 * @param {*} shadowColor
 * @param {*} elevation
 */
const generateShadowStyle = ({ shadowColor, elevation }) => {
  return {
    shadowColor: shadowColor,
    shadowOffset: {
      width: 0,
      height: Math.round(elevation) / 2
    },
    shadowOpacity: (elevation * 0.22) / 3,
    shadowRadius: (elevation * 2.22) / 3,

    elevation: elevation
  };
};

class Button extends Component {
  // Define prop types
  static propTypes = {
    backgroundColor: PropTypes.string,
    text: PropTypes.string,
    onPress: PropTypes.func,
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
    shadowLevel: PropTypes.number,
    shadowColor: PropTypes.string
  };

  // Set default prop values
  static defaultProps = {
    onPress: PropTypes.func,
    type: "primary",
    shadowLevel: 0,
    shadowColor: 'black'
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { width, height, children, style, onPress, text, backgroundColor, type, shadowLevel, shadowColor } = this.props;
    return (
      <TouchableOpacity
        style={[
          {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
            paddingVertical: 8,
            minHeight: 40,
            backgroundColor,
            width,
            height
          },
          style,
          {
            ...type === "primary" ? {
              backgroundColor: '#273069',
              borderRadius: 30
            } : {
              backgroundColor:'#fff'
            }
          },
          generateShadowStyle({
            shadowColor, elevation: shadowLevel
          })
        ]}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

export default Button;
