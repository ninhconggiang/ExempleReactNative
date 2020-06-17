import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View } from "react-native";
import styles from "./Styles/ColStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Col) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report 
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Col", () => <Col />);

class Col extends Component {
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

    Component: PropTypes.any,
    leftContent: PropTypes.bool, //All content contained is aligned to left side
    rightContent: PropTypes.bool, //All content contained is aligned to right side
    centerHorizontal: PropTypes.bool, //All content contained is aligned to center side horizontal
    centerVertical: PropTypes.bool, //All content contained is aligned to center side vertically
    center: PropTypes.bool, //It means enableing centerHorizontal and centerVertical at the same time
    fillParent: PropTypes.bool //Fill all empty space in View,
   
  };

  // Set default prop values
  static defaultProps = {
    leftContent: false,
    rightContent: false,
    centerHorizontal: false,
    centerVertical: false,
    center: false,
    fillParent: false,
    Component: View
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
      width,
      height,
      leftContent,
      rightContent,
      centerHorizontal,
      centerVertical,
      center,
      fillParent,
      Component
    } = this.props;
    const styles = [
      {
        ...(leftContent ? { justifyContent: "flex-start" } : {}),
        ...(rightContent ? { justifyContent: "flex-end" } : {}),
        ...(centerVertical ? { justifyContent: "center" } : {}),
        ...(centerHorizontal ? { alignItems: "center" } : {}),
        ...(center ? { justifyContent: "center", alignItems: "center" } : {}),
        ...(fillParent ? { alignSelf: "stretch", flexGrow: 1, flexShrink: 1 } : {}),
        width,
        height
      },
      style
    ];

    return (
      <Component {...this.props} style={[{ width, height }, styles]}>
        {children}
      </Component>
    );
  }
}

export default Col;
