import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import styles from "./Styles/CardStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Card) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Card", () => <Card />);

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

class Card extends Component {
  // Define prop types
  static propTypes = {
    nodePosition: PropTypes.number,
    nodeSize: PropTypes.number,
    nodeColor: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    containerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]), //Container style is only applied in the case of using nodePosition
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    shadowLevel: PropTypes.number //Auto generate shadow to Card
  };

  // Set default prop values
  static defaultProps = {
    nodeSize: 20,
    nodeColor: '#ffffff'
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      children,
      style,
      containerStyle,
      nodePosition,
      width,
      height,
      nodeSize,
      shadowLevel,
      nodeColor
    } = this.props;

    let flattenStyle = StyleSheet.flatten(style || {});
    let shadowStyle = shadowLevel
      ? generateShadowStyle({
          shadowColor: "#000000",
          elevation: shadowLevel
        })
      : {};

    if (nodePosition)
      return (
        <View style={[containerStyle, shadowStyle]}>
          <View style={[{ width, height }, style, { marginTop: nodeSize / 2 }]}>
            {children}
          </View>
          <View
            style={{
              backgroundColor:
                (flattenStyle && flattenStyle.backgroundColor) || "#000000",
              width: nodeSize,
              height: nodeSize,
              position: "absolute",
              top: 0,
              borderRadius: nodeSize / 2,
              left: nodePosition,
              overflow: "visible",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: nodeSize - nodeSize / 2,
                height: nodeSize - nodeSize / 2,
                borderRadius: (nodeSize - nodeSize / 2) / 2,
                backgroundColor: nodeColor
              }}
            />
          </View>
        </View>
      );
    else
      return (
        <View style={[{ width, height }, style, shadowStyle]}>{children}</View>
      );
  }
}

export default Card;
