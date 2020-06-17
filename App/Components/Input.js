import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  View,
  TextInput,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import styles from "./Styles/InputStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Input) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Input", () => <Input />);

class Input extends Component {
  // Define prop types
  static propTypes = {

    height: PropTypes.number,
    width: PropTypes.number,

    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChangeValue: PropTypes.func,
    leftComponent: PropTypes.element,
    rightComponent: PropTypes.element,
    disabled: PropTypes.bool,
    containerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    keyboardType: PropTypes.oneOf(["phone", "email", "number"]),
    isPassword: PropTypes.bool,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  // Set default prop values
  static defaultProps = {
    value: "",
    onChangeValue: value => { },
    disabled: false,
    isPassword: false
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
    this._getKeyboardType = this._getKeyboardType.bind(this);
    this._toggleShowPassword = this._toggleShowPassword.bind(this);
  }

  _toggleShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword
    });
  };

  /**
   * Get keyboard type
   */
  _getKeyboardType = type => {
    switch (type) {
      case "phone":
        return "phone-pad";
        break;
      case "email":
        return "email-pad";
        break;
      case "number":
        return "numeric";
        break;
      default:
        return "default";
    }
  };

  render() {
    const {

      leftComponent,
      rightComponent,
      value,
      onChangeValue,
      containerStyle,
      placeholder,
      disabled,
      keyboardType,
      isPassword,
      style,
      width, height
    } = this.props;
    const { showPassword } = this.state;
    return (
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: "#ebebeb",
            borderRadius: 0,
            paddingHorizontal: 16
          },
          containerStyle
        ]}
      >
        {leftComponent}
        <TextInput
          fontStyle={value.length==0?'italic':'normal'}
          disabled={disabled}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor="#47525E"
          style={[
            {
              height,
              borderColor: "gray",
              borderWidth: 0,
              flexGrow: 1,
              flexShrink: 1,
              width 
            },
            style
          ]}
          value={`${value}`}
          onChangeText={onChangeValue}
          keyboardType={this._getKeyboardType(keyboardType)}
          secureTextEntry={!showPassword && isPassword}
        />
        {/* {isPassword && (
          <TouchableWithoutFeedback onPress={this._toggleShowPassword}>
            <Image
              style={{ height: 15, width: 15 }}
              resizeMode="contain"
              source={
                showPassword
                  ? require("../Images/Icons/close-button.png")
                  : require("../Images/Icons/faq-icon.png")
              }
            />
          </TouchableWithoutFeedback>
        )} */}
        {rightComponent}
      </View>
    );
  }
}

export default Input;
