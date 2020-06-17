import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import styles from "./Styles/ModalPickerStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
// import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Empty from "./Empty";
import Divider from "./Divider";
import List from "./List";
import Col from "./Col";
import Checkbox from "./Checkbox";
import Row from "./Row";
import Button from "./Button";
import deepDiffer from "react-native/Libraries/Utilities/differ/deepDiffer";

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/ModalPicker) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("ModalPicker", () => <ModalPicker />);

class ModalPicker extends Component {
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

    title: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    valueExtractor: PropTypes.func.isRequired,
    labelExtractor: PropTypes.func.isRequired,
    onValueSubmit: PropTypes.func,
    initialLabel: PropTypes.string,
    initialPosition: PropTypes.number,
    isSubmitOnInit: PropTypes.bool //When init value from props.initialPosition, then call onValueSubmit
  };

  // Set default prop values
  static defaultProps = {
    valueExtractor: item => {},
    labelExtractor: item => {},
    onValueSubmit: value => {},
    initialPosition: 0,
    isSubmitOnInit: true
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      checkedArr: []
    };
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
    const { initialPosition, valueExtractor, isSubmitOnInit } = this.props;
    if (data && data[initialPosition]) {
      this._addCheckedItem(valueExtractor(data[initialPosition]), () => {
        if (isSubmitOnInit) {
          this.onSubmit();
        }
      });
    }
  };

  _initialLabel = () => {
    const { initialLabel, data, labelExtractor, valueExtractor } = this.props;
    if (initialLabel) {
      var checkedArr = [];
      data.map((item, index) => {
        if (labelExtractor(item) === initialLabel) {
          checkedArr.push(valueExtractor(item));
        }
      });
      this.setState({
        checkedArr
      });
    }
  };

  //Toggle modal visibility
  _toggleModal = () => {
    const { isModalVisible } = this.state;
    if (!isModalVisible) {
      this._initialLabel();
    }
    this.setState({
      isModalVisible: !isModalVisible
    });
  };

  //Add checked item
  _addCheckedItem = (item, onDoneCallback) => {
    const { checkedArr } = this.state;
    var newArr = { ...checkedArr };
    newArr = [];
    newArr.push(item);
    this.setState(
      {
        checkedArr: newArr
      },
      () => {
        onDoneCallback && onDoneCallback();
      }
    );
  };

  //Check item is checked, item is from data
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

  _renderItem = ({ item }) => {
    const { labelExtractor, valueExtractor } = this.props;
    return (
      <Col
        Component={TouchableOpacity}
        onPress={() => {
          this._addCheckedItem(valueExtractor(item));
        }}
        style={styles.itemCard}
      >
        <Row>
          <Checkbox
            onChangeValue={value => {
              this._addCheckedItem(valueExtractor(item));
            }}
            value={this._isChecked(valueExtractor(item))}
          />
          <Text>{labelExtractor(item)}</Text>
        </Row>
      </Col>
    );
  };

  renderArr = () => {
    const { data } = this.props;
    return (
      <List
        hideScrollBar
        data={data}
        renderItem={this._renderItem.bind(this)}
        keyExtractor={(item, idx) => idx}
        style={{ marginTop: 20, padding: 8 }}
        ListEmptyComponent={<Empty />}
        ItemSeparatorComponent={() => (
          <Divider width="90%" style={{ alignSelf: "center", opacity: 0.5 }} />
        )}
      />
    );
  };

  onSubmit = () => {
    const { checkedArr } = this.state;
    const { onValueSubmit } = this.props;

    onValueSubmit(this._getCurrentValue());
  };

  _getCurrentValue = () => {
    const { checkedArr } = this.state;
    return (checkedArr && checkedArr[0]) || "";
  };

  _getCurrentLabel = () => {
    const { checkedArr } = this.state;
    const { data, valueExtractor, labelExtractor } = this.props;
    var label = "";
    (data || []).map(item => {
      if ((checkedArr && checkedArr[0]) === valueExtractor(item)) {
        label = labelExtractor(item);
      }
    });
    return label || "";
  };

  render() {
    const { children, title, style } = this.props;
    const { isModalVisible, checkedArr } = this.state;
    return (
      <TouchableOpacity
        onPress={() => {
          this._toggleModal();
        }}
      >
        <View style={style}>
          {typeof children == "function"
            ? children({
                currentValue: this._getCurrentValue(),
                currentLabel: this._getCurrentLabel()
              })
            : children}
          <Modal isVisible={isModalVisible}>
            <Col style={styles.modal}>
              <Row fillParent centerVertical>
                <TouchableOpacity
                  onPress={() => {
                    this._toggleModal();
                  }}
                >
                  <MaterialCommunityIcons
                    name="window-close"
                    style={styles.icClose}
                  />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
              </Row>
              {title && <Divider />}
              {this.renderArr()}
              <Divider />
              <Button
                onPress={() => {
                  this._toggleModal();
                  this.onSubmit();
                }}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Text style={{ alignSelf: "center", paddingVertical: 8 }}>
                  Xác nhận
                </Text>
              </Button>
            </Col>
          </Modal>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ModalPicker;
