import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View, Text } from "react-native";
import styles from "./Styles/ErrorMessageStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/ErrorMessage) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("ErrorMessage", () => <ErrorMessage />);

class ErrorMessage extends Component {
  // Define prop types
  static propTypes = {
    message: PropTypes.string,
    isVisible: PropTypes.bool,
    containerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    textStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    leftComponent: PropTypes.any,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  // Set default prop values
  static defaultProps = {
    isVisible: true
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
      message,
      isVisible,
      textStyle,
      containerStyle,
      leftComponent
    } = this.props;
    return (
      Boolean(isVisible) && (
        <View
          style={[
            { flexDirection: "row", alignItems: "center" },
            containerStyle
          ]}
        >
          {leftComponent}
          <View style={{ flex: 1, flexGrow: 1 }}>
            <Text
              style={[
                {
                  flexGrow: 1,
                  flexShrink: 1,
                  color: "red",
                  textAlign: "right",
                  textAlignVertical: "center",
                  fontSize: 10
                },
                textStyle
              ]}
            >
              {message}
            </Text>
          </View>
        </View>
      )
    );
  }
}

export default ErrorMessage;
