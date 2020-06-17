import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View, TouchableOpacity, Text } from "react-native";
import styles from "./Styles/ConfirmDialogStyles";
import Modal from "react-native-modal";
import ExamplesRegistry from "../Services/ExamplesRegistry";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Divider from "./Divider";
import Col from "./Col";
import Button from "./Button";
import Row from "./Row";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/ConfirmDialog) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("ConfirmDialog", () => <ConfirmDialog />);

class ConfirmDialog extends Component {
  // Define prop types
  static propTypes = {
    title: PropTypes.string,
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
    submitText: PropTypes.string,
    cancelText: PropTypes.string,
    hideOnSubmit: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
    onCancel: PropTypes.func,
    title: PropTypes.string,
    showCancelBtn: PropTypes.bool,
    isVisible: PropTypes.bool,
    useExternalVisibility: PropTypes.bool
  };

  // Set default prop values
  static defaultProps = {
    title: "",
    submitText: "Xác nhận",
    cancelText: "Huỷ bỏ",
    onSubmit: () => {},
    onClose: () => {},
    onCancel: () => {},
    hideOnSubmit: true,
    showCancelBtn: true,
    isVisible: false,
    useExternalVisibility: false
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
  }

  //Toggle modal visibility
  toggle = () => {
    const { isModalVisible } = this.state;
    this.setState({
      isModalVisible: !isModalVisible
    });
  };

  close = () => {
    this.setState({
      isModalVisible: false
    });
  };

  open = () => {
    this.setState({
      isModalVisible: true
    });
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    onSubmit();
  };

  render() {
    const {
      title,
      children,
      submitText,
      hideOnSubmit,
      onClose,
      cancelText,
      showCancelBtn,
      onCancel,
      useExternalVisibility,
      isVisible
    } = this.props;
    const { isModalVisible } = this.state;
    const visible = useExternalVisibility ? isVisible : isModalVisible;
    return (
      (visible && (
        <View>
          <Modal isVisible={true}>
            <Col style={styles.modal}>
              <Row fillParent centerVertical>
                <TouchableOpacity
                  onPress={() => {
                    this.close();
                    onClose();
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
              {children}
              <Divider />
              <Row>
                {showCancelBtn && (
                  <Button
                    onPress={() => {
                      this.close();
                      onCancel();
                    }}
                    style={{
                      width: showCancelBtn ? "50%" : "100%",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={{ alignSelf: "center", paddingVertical: 8 }}>
                      {cancelText}
                    </Text>
                  </Button>
                )}
                <Button
                  onPress={() => {
                    if (hideOnSubmit) this.close();
                    this.onSubmit();
                  }}
                  style={{
                    width: showCancelBtn ? "50%" : "100%",
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ alignSelf: "center", paddingVertical: 8 }}>
                    {submitText}
                  </Text>
                </Button>
              </Row>
            </Col>
          </Modal>
        </View>
      )) ||
      false
    );
  }
}

export default ConfirmDialog;
