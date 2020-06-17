import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View, Text } from "react-native";
import styles from "./Styles/NumericInputStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
import Row from "./Row";
import Button from "./Button";
import Input from "./Input";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/NumericInput) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("NumericInput", () => <NumericInput />);

class NumericInput extends Component {
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
    value: PropTypes.number,
    onChangeValue: PropTypes.func,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    stepValue: PropTypes.number,
    disabled: PropTypes.bool,
    callOnChangeOnInit: PropTypes.bool
  };

  // Set default prop values
  static defaultProps = {
    value: 0,
    minValue: 0,
    stepValue: 1,
    onChangeValue: value => {},
    disabled: false,
    callOnChangeOnInit: true
  };

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      value: this._validValue(0)
    };
  }

  _inscrease = () => {
    const { value, onChangeValue, stepValue } = this.props;
    onChangeValue(this._validValue(value + stepValue));
  };

  _decrease = () => {
    const { value, onChangeValue, stepValue } = this.props;
    onChangeValue(this._validValue(value - stepValue));
  };

  _validValue = nextValue => {
    const { minValue, maxValue } = this.props;
    if (this._isMinReach(nextValue)) {
      nextValue = minValue;
    }
    if (this._isMaxReach(nextValue)) {
      nextValue = maxValue;
    }
    return nextValue;
  };

  _isMinReach = nextValue => {
    const { minValue } = this.props;
    if (minValue || minValue === 0) {
      return nextValue <= minValue;
    } else return false;
  };

  _isMaxReach = nextValue => {
    const { maxValue } = this.props;
    if (maxValue || maxValue === 0) {
      return nextValue >= maxValue;
    }
    return false;
  };

  // _validOverValue = () => {
  //   const { value, minValue, maxValue, onChangeValue } = this.props;
  //   if(value < minValue || value > maxValue) {
  //     onChangeValue(this._validValue(value));
  //   }
  // }

  render() {
    const { value, stepValue, onChangeValue, style, disabled } = this.props;
    //this._validOverValue();
    return (
      <Row style={style}>
        <Button
          style={[
            styles.btnLeft,
            { backgroundColor: disabled || this._isMinReach(value) ? "#ececec" : "#ff6600" }
          ]}
          onPress={() => {
            if (!disabled) this._decrease();
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 20 }}>-</Text>
        </Button>
        <Input
          disabled={disabled}
          keyboardType="number"
          containerStyle={{ borderWidth: 0, width: 60 }}
          style={{ borderWidth: 0, width: 20, textAlign: "center" }}
          value={value || 0}
          onChangeValue={value => {
            onChangeValue(this._validValue(value));
          }}
        />
        <Button
          style={[
            styles.btnRight,
            { backgroundColor: disabled || this._isMaxReach(value) ? "#ececec" : "#ff6600" }
          ]}
          onPress={() => {
            if (!disabled) this._inscrease();
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 20 }}>+</Text>
        </Button>
      </Row>
    );
  }
}

export default NumericInput;
