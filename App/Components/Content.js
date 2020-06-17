import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  View,
  ScrollView,
  ImageBackground,
  RefreshControl
} from "react-native";
import styles from "./Styles/ContentStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/Content) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("Content", () => <Content />);

class Content extends Component {
  // Define prop types
  static propTypes = {
    backgroundImage: PropTypes.any,
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
    onPullToRefresh: PropTypes.func,
    isRefreshing: PropTypes.bool
  };

  // Set default prop values
  static defaultProps = {
    isRefreshing: false
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
      backgroundImage,
      style,
      onPullToRefresh,
      isRefreshing
    } = this.props;
    return backgroundImage ? (
      <ImageBackground
        source={backgroundImage}
        style={{ flex: 1, height: "100%" }}
      >
        <ScrollView
          style={[
            { flex: 1, height: "100%", backgroundColor: "transparent" },
            style
          ]}
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            onPullToRefresh ? (
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onPullToRefresh}
              />
            ) : null
          }
        >
          {children}
        </ScrollView>
      </ImageBackground>
    ) : (
      <ScrollView
        style={[
          { flex: 1, height: "100%", backgroundColor: "transparent" },
          style
        ]}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          onPullToRefresh ? (
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onPullToRefresh}
            />
          ) : null
        }
      >
        {children}
      </ScrollView>
    );
  }
}

export default Content;
