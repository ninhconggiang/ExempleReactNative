import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import styles from "./Styles/ListStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {
  behavior: "padding",
  refreshing: false,
  searchText: "",
  checkedArr: [],
  itemStates: {},
};

// Note that this file (App/Components/List) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("List", () => <List />);

class List extends Component {
  // Define prop types
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    multiCheck: PropTypes.bool, //Allow multiple check
    onCheckChange: PropTypes.func,
    horizontal: PropTypes.bool,
    hideScrollBar: PropTypes.bool, //Hide all scroll bar
    searchKey: PropTypes.array,
    placeholder: PropTypes.string,
    data: PropTypes.array,
    isRefreshing: PropTypes.bool,
    renderItem: PropTypes.any,
    renderSeparator: PropTypes.any,
    pullToRefreshCallback: PropTypes.func,
    onSearch: PropTypes.func,
    backgroundStyles: PropTypes.object,
    searchTextInputStyle: PropTypes.object,
    searchBarBackgroundStyles: PropTypes.object,
    searchable: PropTypes.bool,
    renderEmptyRow: PropTypes.any,
    elementBetweenSearchAndList: PropTypes.element,

    onItemsStateChange: PropTypes.func,
  };

  // Set default prop values
  static defaultProps = {
    onCheckChange: (checkedArr) => {},
    renderItem: ({ item, index, state, setSate }) => {}, //state
    multiCheck: false,
    horizontal: false,
    searchKey: [],
    placeholder: "Search ...",
    data: [],
    isRefreshing: false,
    renderSeparator: () => <View style={styles.defaultSeparator} />,
    pullToRefreshCallback: null,
    onSearch: null,
    highlightColor: "",
    backgroundStyles: {},
    searchTextInputStyle: {},
    searchBarBackgroundStyles: {},
    searchable: false,
    renderEmptyRow: () => (
      <Text style={styles.noData}>{"No data available"}</Text>
    ),
    elementBetweenSearchAndList: null,
    hideScrollBar: false,
    onItemsStateChange: (state) => {},
  };

  //Component's states
  state = {
    ...INITIAL_STATE,
  };

  constructor(props, defaultProps) {
    super(props, defaultProps);
    const { refreshOnLoad = true, pullToRefreshCallback } = props;
    if (pullToRefreshCallback !== null && refreshOnLoad) {
      pullToRefreshCallback();
    }
  }

  //Add checked item
  _addCheckedItem = (item, onDoneCallback) => {
    const { checkedArr } = this.state;
    const { multiCheck, onCheckChange } = this.props;
    var newArr = [...checkedArr];
    if (!multiCheck) {
      newArr = [];
    }
    if (!newArr.includes(item)) {
      newArr.push(item);
    } else {
      var index = newArr.indexOf(item);
      if (index !== -1) {
        newArr.splice(index, 1);
      }
    }
    this.setState(
      {
        checkedArr: newArr,
      },
      () => {
        onDoneCallback && onDoneCallback();
      }
    );
    onCheckChange(newArr);
  };

  //Check item is checked, item is from data
  _isChecked = (item) => {
    const { checkedArr } = this.state;
    var isChecked = false;
    checkedArr.map((itm, index) => {
      if (itm === item) {
        isChecked = true;
      }
    });
    return isChecked;
  };

  clearSearch = () => this.setState({ searchText: "" }, this.searchInput.clear);

  onRefresh = () => {
    this.props.pullToRefreshCallback();
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 7000);
  };

  refresh = () => {
    if (this.props.data.length === 0) {
      filtereddata = [{ type: "emptyrow", name: "No data available" }];
    }
    filtereddata = this.props.data;
    this.setState({ refreshing: false, data: filtereddata });
  };

  filterText = () => {
    const { data, searchKey, highlightColor, onSearch } = this.props;
    if (this.state.searchText === "" || onSearch !== null) {
      return data;
    }
    const searchText = this.state.searchText.toLowerCase();
    const filteredData = [];
    for (let d = 0; (d < data || []).length; d += 1) {
      dt = data[d];
      for (let s = 0; s < searchKey.length; s += 1) {
        sk = searchKey[s];
        const target = dt[sk];
        if (typeof target === "undefined" || target == null) {
          continue;
        }
        if (target.toLowerCase().indexOf(searchText) !== -1) {
          if (highlightColor === "") {
            filteredData.push(dt);
            break;
          }
          const row = {};
          row.cleanData = dt;
          const keys = Object.keys(dt);
          for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            if (typeof dt[key] === "string") {
              row[key] = <Text>{dt[key]}</Text>;
            }
          }
          filteredData.push(row);
          break;
        }
      }
    }
    return filteredData || [];
  };

  _setItemState = (state, itemIndex) => {
    const { itemStates } = this.state;
    const { onItemsStateChange } = this.props;
    this.setState(
      {
        itemStates: {
          ...itemStates,
          [itemIndex]: { ...itemStates[itemIndex], ...state },
        },
      },
      () => {
        onItemsStateChange(this._getAllItemStates());
      }
    );
  };

  _setInitialItemState = (state, itemIndex) => {
    const { itemStates } = this.state;
    if (!itemStates[itemIndex]) {
      this.setState({
        itemStates: { ...itemStates, [itemIndex]: state },
      });
    }
  };

  _getAllItemStates = () => {
    const { itemStates } = this.state;
    var allItemStates = [];
    Object.keys(itemStates || {}).map(function (key, index) {
      allItemStates.push(itemStates[key]);
    });
    return allItemStates;
  };

  getAllStates = () => {
    return this._getAllItemStates() || {};
  };

  render() {
    const {
      renderItem,
      renderSeparator,
      pullToRefreshCallback,
      isRefreshing,
      backgroundStyles,
      searchBarBackgroundStyles,
      onSearch,
      placeholder,
      searchTextInputStyle,
      searchable,
      horizontal,
      hideScrollBar,
      style,
    } = this.props;
    const { searchText, itemStates } = this.state;
    const filteredData = this.filterText();

    const searchbar = (
      <View style={[styles.searchBarContainer, searchBarBackgroundStyles]}>
        <TextInput
          ref={(c) => (this.searchInput = c)}
          style={[styles.searchBar, searchTextInputStyle]}
          placeholder={placeholder}
          clearButtonMode="while-editing"
          placeholderTextColor="#919188"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(searchText) => this.setState({ searchText })}
          value={searchText}
          maxLength={100}
          returnKeyType="search"
          onSubmitEditing={() => onSearch && onSearch(this.state.searchText)}
        />
      </View>
    );

    return (
      <View
        behavior={this.state.behavior}
        style={[styles.container, backgroundStyles]}
      >
        {searchable && searchbar}
        {this.props.elementBetweenSearchAndList}
        <FlatList
          {...this.props}
          showsVerticalScrollIndicator={!Boolean(hideScrollBar)}
          showsHorizontalScrollIndicator={!Boolean(hideScrollBar)}
          refreshControl={
            onSearch !== null ? (
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => onSearch(searchText)}
              />
            ) : pullToRefreshCallback !== null ? (
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={pullToRefreshCallback}
              />
            ) : null
          }
          data={filteredData || []}
          renderItem={({
            item,
            index,
            separators: { highlight, unhighlight, updateProps },
          }) => (
            <TouchableOpacity
              onPress={() => {
                this._addCheckedItem(item);
              }}
            >
              {renderItem({
                item,
                index,
                isChecked: this._isChecked(item),
                state: itemStates[index] || {},
                allStates: this._getAllItemStates() || {},
                setState: (state) => {
                  this._setItemState(state, index);
                },
                setInitialState: (state) => {
                  this._setInitialItemState(state, index);
                },
              })}
            </TouchableOpacity>
          )}
          style={[styles.flatList, style]}
          horizontal={horizontal}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default List;
