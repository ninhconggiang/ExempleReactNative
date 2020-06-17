import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { Icon, normalize } from 'react-native-elements'
import styles from "./Styles/CheckboxStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Checkbox) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Checkbox", () => <Checkbox />);

class Checkbox extends Component {
  // Define prop types
  static propTypes = {
    content: PropTypes.element,
    value: PropTypes.bool,
    onChangeValue: PropTypes.func,
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
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: PropTypes.string,
  };

  // Set default prop values
  static defaultProps = {
    value: false,
    onChangeValue: value => {},
    color:"#273069"
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }

  render() {
    const { content, value, onChangeValue, containerStyle,color } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          onChangeValue(!Boolean(value || false));
        }}
      >
        <View
          style={[
            { flexDirection: "row", alignItems: "center" },
            containerStyle
          ]}
        >
         <Icon name={ Boolean(value || false)?'check-square':'square'} type='font-awesome'  color='#273069' />
          {/* <Image
            source={
              Boolean(value || false)
                ? require("../Images/Icons/ic_checked_box.png")
                : require("../Images/Icons/ic_unchecked_box.png")
            }
            style={{ width: 20, height: 20 , color:'#707070' }}
          /> */}
          <View style={{ marginLeft: 8 }}>{content}</View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Checkbox;
