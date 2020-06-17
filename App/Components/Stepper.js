import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View, Text } from "react-native";
import styles from "./Styles/StepperStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {
  stepPosition: 0,
  stepStates: {}
};

// Note that this file (App/Components/Stepper) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Stepper", () => <Stepper />);

class Stepper extends Component {
  // Define prop types
  static propTypes = {
    stepCount: PropTypes.number.isRequired,
    onChangeStep: PropTypes.func
  };

  // Set default prop values
  static defaultProps = {
    onChangeStep: stepPosition => {}
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
  }

  reset = () => {
    const { onChangeStep } = this.props;
    this.setState(INITIAL_STATE);
    onChangeStep(INITIAL_STATE.stepPosition);
  };

  isLastStep = () => {
    const { stepPosition } = this.state;
    return stepPosition === stepCount;
  };

  nextStep = () => {
    const { stepPosition } = this.state;
    const { stepCount, onChangeStep } = this.props;
    if (stepPosition + 1 < stepCount)
      this.setState(
        {
          stepPosition: stepPosition + 1
        },
        () => {
          onChangeStep(this.state.stepPosition);
        }
      );
  };

  previousStep = () => {
    const { stepPosition } = this.state;
    const { stepCount, onChangeStep } = this.props;
    if (stepPosition - 1 < stepCount)
      this.setState(
        {
          stepPosition: stepPosition - 1
        },
        () => {
          onChangeStep(this.state.stepPosition);
        }
      );
  };

  getStepStates = stepPos => {
    const { stepStates } = this.state;
    return stepStates[`${stepPos}`] || {};
  };

  _returnCurrentStepComponent = () => {
    const { stepPosition, stepStates } = this.state;
    return typeof this.props[`step${stepPosition}`] === "function"
      ? this.props[`step${stepPosition}`]({
          state: stepStates[stepPosition] || {},
          setState: (state, onDone) => {
            this._setStepState(state, stepPosition, onDone);
          },
          getStepState: stepPos => {
            return this.getStepStates(stepPos);
          }
        })
      : this.props[`step${stepPosition}`] || <View />;
  };

  _setStepState = (state, stepPosition, onDone) => {
    const { stepStates } = this.state;
    this.setState(
      {
        stepStates: { ...stepStates, [stepPosition]: state }
      },
      onDone
    );
  };

  render() {
    const { stepPosition } = this.state;
    const { stepCount, currentStep } = this.props;
    return (
      <View>
        {/* <Text>{JSON.stringify(this.state.stepStates)}</Text> */}
        {this._returnCurrentStepComponent()}
      </View>
    );
  }
}

export default Stepper;
