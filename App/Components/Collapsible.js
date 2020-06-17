import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View, Text } from "react-native";
import styles from "./Styles/CollapsibleStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';
import RNCCollapsible from "react-native-collapsible";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Row from "./Row";
import Button from "./Button";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Col from "./Col";

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {
  isCollapsed: false
};

// Note that this file (App/Components/Collapsible) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Collapsible", () => <Collapsible />);

class Collapsible extends Component {
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
    header: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  // Set default prop values
  static defaultProps = {};

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
  }

  _collapse = () => {
    this.setState({
      isCollapsed: true
    });
  };

  _expand = () => {
    this.setState({
      isCollapsed: false
    });
  };

  _toggle = () => {
    const { isCollapsed } = this.state;
    this.setState({
      isCollapsed: !isCollapsed
    });
  };

  render() {
    const { children, header } = this.props;
    const { isCollapsed } = this.state;
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            this._toggle();
          }}
        >
          <Row centerVertical>
            <Col fillParent>{header}</Col>
            <SimpleLineIcons
              name={isCollapsed? "arrow-down" : "arrow-up"}
              style={{
                color: "#000000",
                fontSize: 12,
                marginLeft: 6
              }}
            />
          </Row>
        </TouchableWithoutFeedback>
        <RNCCollapsible collapsed={isCollapsed}>{children}</RNCCollapsible>
      </View>
    );
  }
}

export default Collapsible;
