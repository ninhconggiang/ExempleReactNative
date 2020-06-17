/* init*/

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/GroupSelectorStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
import List from "./List";
import Row from "./Row";
import deepDiffer from "react-native/Libraries/Utilities/differ/deepDiffer";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/GroupSelector) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("GroupSelector", () => <GroupSelector />);

class GroupSelector extends Component {
  // Define prop types
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    checkedStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    uncheckedStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    checkedTextStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    containerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    children: PropTypes.oneOfType([PropTypes.func]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    data: PropTypes.arrayOf(PropTypes.any),
    valueExtractor: PropTypes.func.isRequired,
    renderItem: PropTypes.func,
    labelExtractor: PropTypes.func.isRequired,
    onValueSubmit: PropTypes.func,
    initialLabel: PropTypes.string,
    initialPosition: PropTypes.number,
    vertical: PropTypes.bool,
    isSubmitOnInit: PropTypes.bool //When init value from props.initialPosition, then call onValueSubmit
  };

  // Set default prop values
  static defaultProps = {
    valueExtractor: item => {},
    labelExtractor: item => {},
    onValueSubmit: value => {},
    //renderItem: ({ item, index, isChecked, label, value, onCheck }) => {},
    children: ({ selectedItem }) => {},
    initialPosition: 0,
    isSubmitOnInit: true,
    vertical: false
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedArr: []
    };
    this._initialLabel();
  }

  componentDidMount() {
    const { data } = this.props;
    this._init(data);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    if (deepDiffer(data, nextProps.data)) {
      this._init(nextProps.data);
    }
  }

  //Initial the first value
  _init = data => {
    const { initialPosition, valueExtractor } = this.props;
    if (data && data[initialPosition]) {
      this._addCheckedItem(valueExtractor(data[initialPosition]));
    }
  };

  _initialLabel = () => {
    const { initialLabel, data, labelExtractor, valueExtractor } = this.props;
    if (initialLabel) {
      var checkedArr = [];
      data.map((item, index) => {
        if (`${labelExtractor(item)}` === `${initialLabel}`) {
          checkedArr.push(valueExtractor(item));
        }
      });
      this.setState({
        checkedArr
      });
    }
  };

  _addCheckedItem = item => {
    const { checkedArr } = this.state;
    var newArr = { ...checkedArr };
    newArr = [];
    newArr.push(item);
    this.setState(
      {
        checkedArr: newArr
      },
      () => {
        this._onSubmit();
      }
    );
  };

  //On Submit check
  _onSubmit = () => {
    const { checkedArr } = this.state;
    const { onValueSubmit } = this.props;
    onValueSubmit((checkedArr && checkedArr[0]) || "");
  };

  _isChecked = item => {
    const { checkedArr } = this.state;
    var isChecked = false;
    checkedArr.map((itm, index) => {
      if (itm === item) {
        isChecked = true;
      }
    });
    return isChecked;
  };

  render() {
    const { checkedArr } = this.state;
    const {
      valueExtractor,
      labelExtractor,
      data,
      containerStyle,
      checkedStyle,
      checkedTextStyle,
      uncheckedStyle,
      vertical,
      renderItem
    } = this.props;
    return (
      <View style={containerStyle}>
        {this.props.children({ selectedItem: {} })}
        <List
          horizontal={!vertical}
          data={data || []}
          extraData={this.state}
          renderItem={({ item, index }) => {
            const isChecked = this._isChecked(valueExtractor(item));
            if (renderItem) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this._addCheckedItem(valueExtractor(item));
                  }}
                >
                  {renderItem({
                    item,
                    index,
                    isChecked,
                    label: labelExtractor(item),
                    value: valueExtractor(item),
                    onCheck: () => {
                      this._addCheckedItem(valueExtractor(item));
                    }
                  })}
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                onPress={() => {
                  this._addCheckedItem(valueExtractor(item));
                }}
              >
                <Row
                  style={
                    isChecked
                      ? checkedStyle || styles.selectedItem
                      : uncheckedStyle || styles.item
                  }
                >
                  <Text
                    numberOfLines={2}
                    style={
                      isChecked
                        ? checkedTextStyle || styles.selectedTxt
                        : styles.txt
                    }
                  >
                    {labelExtractor(item)}
                  </Text>
                </Row>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

export default GroupSelector;
