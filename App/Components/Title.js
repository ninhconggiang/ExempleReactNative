import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import styles from "./Styles/TitleStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Title) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Title", () => (
  <Title
    title={"Your title here"}
    leftComponent={<Text>Left Component</Text>}
    rightComponent={<Text>Right Component</Text>}
    isDividerVisible={true}
  />
));

class Title extends Component {
  // Define prop types
  static propTypes = {
    title: PropTypes.string,
    leftComponent: PropTypes.element,
    rightComponent: PropTypes.element,
    isDividerVisible: PropTypes.bool,
    dividerColor: PropTypes.string,
    dividerType: PropTypes.oneOf(["line", "dot"]),
    dividerWidth: PropTypes.any,
    titleStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    containerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  // Set default prop values
  static defaultProps = {
    title: "",
    dividerType: "line",
    leftComponent: <View />,
    rightComponent: <View />,
    isDividerVisible: true,
    dividerWidth: "100%"
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
  }

  //Get divider view
  _getDivider = type => {
    const { dividerColor, dividerWidth } = this.props;
    switch (type) {
      case "line":
        return (
          <View
            style={[
              styles.dvLineDivider,
              { backgroundColor: dividerColor, width: dividerWidth }
            ]}
          />
        );
      case "dot":
        return (
          <View
            style={[
              styles.dvDotDivider,
              { backgroundColor: dividerColor, alignSelf: "center" }
            ]}
          />
        );
      default:
        return (
          <View
            style={[
              styles.dvLineDivider,
              { backgroundColor: dividerColor, width: dividerWidth }
            ]}
          />
        );
    }
  };

  render() {
    const {
      title,
      leftComponent,
      rightComponent,
      isDividerVisible,
      titleStyle,
      containerStyle,
      dividerType
    } = this.props;
    return (
      <View style={containerStyle}>
        <View>
          <View style={[{ flexDirection: "row" }]}>
            {leftComponent}
            <View>
              <Text
                selectable={true}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={titleStyle}
              >
                {title}
              </Text>
              {Boolean(isDividerVisible) &&
                dividerType &&
                dividerType === "dot" &&
                this._getDivider("dot")}
            </View>

            {rightComponent}
          </View>
          {Boolean(isDividerVisible) &&
            dividerType &&
            dividerType !== "dot" &&
            this._getDivider()}
        </View>
      </View>
    );
  }
}

export default Title;
