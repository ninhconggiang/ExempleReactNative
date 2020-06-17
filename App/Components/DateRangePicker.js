import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/DateRangePickerStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
import Stepper from "./Stepper";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
// import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import moment from "moment";
import Divider from "./Divider";
import Row from "./Row";
import Button from "./Button";
import { LocaleConfig } from "react-native-calendars";
import Shape from "./Shape";
import Col from "./Col";

LocaleConfig.locales["vn"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
  ],
  monthNamesShort: [
    "T.1",
    "T.2",
    "T.3",
    "T.4",
    "T.5",
    "T.6",
    "T.7",
    "T.8",
    "T.9",
    "T.10",
    "T.11",
    "T.12"
  ],
  dayNames: ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  today: "Hôm nay"
};
LocaleConfig.defaultLocale = "vn";

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/DateRangePicker) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("DateRangePicker", () => (
  <DateRangePicker />
));

class DateRangePicker extends Component {
  // Define prop types
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onSelectRangeDate: PropTypes.func,
    type: PropTypes.oneOf(["both", "separate"])
  };

  // Set default prop values
  static defaultProps = {
    onSelectRangeDate: ({ startDate, endDate }) => {},
    type: "both"
  };

  //Component's states
  state = {
    ...INITIAL_STATE
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: undefined
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = () => {
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

  _getAllDatesBetween = () => {
    const { startDate, endDate } = this.state;
    var formattedDates = {};
    var currDate = moment(startDate, "YYYY-MM-DD").startOf("day");
    var lastDate = moment(endDate, "YYYY-MM-DD").startOf("day");

    while (currDate.add(1, "days").diff(lastDate) < 0) {
      formattedDates = {
        ...formattedDates,
        [moment(currDate.clone().toDate(), "YYYY-MM-DD").format(
          "YYYY-MM-DD"
        )]: {
          color: "#ff6600",
          textColor: "#ffffff"
        }
      };
    }
    return formattedDates;
  };

  render() {
    const { onSelectRangeDate, style, type } = this.props;
    const { isModalVisible, startDate, endDate } = this.state;
    switch (type) {
      case "separate":
        return (
          <View stule={style}>
            <Row>
            <Button onPress={this.toggleModal}>
              <Text>Ngày bắt đầu</Text>
              </Button>
              <Text>-</Text>
              <Button onPress={this.toggleModal}>
              <Text>Ngày kết thúc</Text>
              </Button>
            </Row>

            <TouchableOpacity onPress={this.toggleModal}>
              {this.props.children({
                startDate: startDate || new Date(),
                endDate: endDate || startDate || new Date()
              })}
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} style={{ borderRadius: 8 }}>
              <View>
                <Stepper
                  ref={ref => (this.stepper = ref)}
                  stepCount={2}
                  step0={
                    <View
                      style={{
                        justifyContent: "center",
                        backgroundColor: "#ffffff",
                        padding: 8,
                        borderRadius: 8
                      }}
                    >
                      <Row>
                        <Col
                          fillParent
                          centerVertical
                          style={{
                            backgroundColor: "#f3f3f3",
                            padding: 6,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8
                          }}
                        >
                          <Shape type="circle" size={15} color={"#ff6600"} />
                          <Text
                            style={{
                              color: "#000000",
                              alignSelf: "center",
                              marginTop: 8,
                              fontSize: 13
                            }}
                          >
                            Ngày bắt đầu
                          </Text>
                          {startDate && (
                            <Text
                              style={{
                                alignSelf: "center",
                                color: "#000000",
                                marginTop: 4,
                                fontSize: 11
                              }}
                            >
                              ({startDate})
                            </Text>
                          )}
                        </Col>

                        <Col fillParent centerVertical style={{ padding: 6 }}>
                          <Shape type="circle" size={15} color={"#ececec"} />
                          <Text
                            style={{
                              color: "#c3c3c3",
                              alignSelf: "center",
                              marginTop: 8
                            }}
                          >
                            Ngày kết thúc
                          </Text>
                        </Col>
                      </Row>
                      <Divider style={{ marginTop: 0 }} />

                      <CalendarList
                        // Enable horizontal scrolling, default = false
                        horizontal={true}
                        // Enable paging on horizontal, default = false
                        pagingEnabled={true}
                        // Set custom calendarWidth.
                        calendarWidth={300}
                        style={{ width: 300, alignSelf: "center" }}
                        current={startDate || new Date()}
                        markedDates={{
                          [moment(startDate, "YYYY-MM-DD").format(
                            "YYYY-MM-DD"
                          )]: {
                            selected: true,
                            //marked: true,
                            selectedColor: "#ff6600"
                          }
                        }}
                        onDayPress={date => {
                          console.log(date);
                          this.setState({
                            startDate: date.dateString
                          });
                        }}
                        onDayLongPress={day => {}}
                        monthFormat={"'Tháng' MM 'năm' yyyy"}
                      />
                      <Divider />
                      <Row rightContent>
                        <Button
                          onPress={() => {
                            this.close();
                          }}
                          style={{
                            flexGrow: 1
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              textAlign: "center",
                              marginRight: 8,
                              marginVertical: 8
                            }}
                          >
                            Huỷ bỏ
                          </Text>
                        </Button>

                        <Button
                          onPress={() => {
                            this.setState(
                              {
                                endDate: startDate
                              },
                              () => {
                                this.stepper.nextStep();
                              }
                            );
                          }}
                          style={{
                            flexGrow: 1
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              textAlign: "center",
                              marginRight: 8,
                              fontWeight: "bold",
                              marginVertical: 8
                            }}
                          >
                            Tiếp Theo
                          </Text>
                        </Button>
                      </Row>
                    </View>
                  }
                  step1={
                    <View
                      style={{
                        justifyContent: "center",
                        backgroundColor: "#ffffff",
                        padding: 8,
                        borderRadius: 8
                      }}
                    >
                      <Row>
                        <Col fillParent centerVertical>
                          <Shape
                            type="circle"
                            size={15}
                            color={"#ececec"}
                            style={{ padding: 6 }}
                          />
                          <Text
                            style={{
                              color: "#c3c3c3",
                              alignSelf: "center",
                              marginTop: 8,
                              fontSize: 13
                            }}
                          >
                            Ngày bắt đầu
                          </Text>
                          {startDate && (
                            <Text
                              style={{
                                alignSelf: "center",
                                color: "#000000",
                                marginTop: 4,
                                fontSize: 11
                              }}
                            >
                              {startDate}
                            </Text>
                          )}
                        </Col>

                        <Col
                          fillParent
                          centerVertical
                          style={{
                            backgroundColor: "#ececec",
                            padding: 6,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8
                          }}
                        >
                          <Shape type="circle" size={15} color={"#ff6600"} />
                          <Text
                            style={{
                              color: "#000000",
                              alignSelf: "center",
                              marginTop: 8,
                              fontSize: 13
                            }}
                          >
                            Ngày kết thúc
                          </Text>
                          {endDate && (
                            <Text
                              style={{
                                alignSelf: "center",
                                color: "#000000",
                                marginTop: 4,
                                fontSize: 11
                              }}
                            >
                              ({endDate})
                            </Text>
                          )}
                        </Col>
                      </Row>
                      <Divider style={{ marginTop: 0 }} />
                      <CalendarList
                        // Enable horizontal scrolling, default = false
                        horizontal={true}
                        // Enable paging on horizontal, default = false
                        pagingEnabled={true}
                        // Set custom calendarWidth.
                        calendarWidth={300}
                        style={{ width: 300, alignSelf: "center" }}
                        current={endDate || startDate}
                        markingType={
                          endDate !== startDate && endDate
                            ? "period"
                            : undefined
                        }
                        markedDates={{
                          ...(endDate !== startDate && endDate
                            ? {
                                [moment(startDate, "YYYY-MM-DD").format(
                                  "YYYY-MM-DD"
                                )]: {
                                  color: "#ff6600",
                                  textColor: "#ffffff",
                                  startingDay: true
                                },
                                ...this._getAllDatesBetween(),
                                [moment(endDate, "YYYY-MM-DD").format(
                                  "YYYY-MM-DD"
                                )]: {
                                  color: "#ff6600",
                                  textColor: "#ffffff",
                                  endingDay: true
                                }
                              }
                            : {
                                [moment(startDate, "YYYY-MM-DD").format(
                                  "YYYY-MM-DD"
                                )]: {
                                  selected: true,
                                  selectedColor: "#ff6600"
                                }
                              })
                        }}
                        onDayPress={date => {
                          console.log(date);
                          this.setState({
                            endDate: date.dateString
                          });
                        }}
                        minDate={startDate}
                        onDayLongPress={day => {}}
                        monthFormat={"'Tháng' MM 'năm' yyyy"}
                      />
                      <Divider />
                      <Row>
                        <Button
                          onPress={() => {
                            this.stepper.previousStep();
                          }}
                          style={{
                            flexGrow: 1
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              textAlign: "center",
                              marginRight: 8,
                              marginVertical: 8
                            }}
                          >
                            Quay lại
                          </Text>
                        </Button>

                        <Button
                          onPress={() => {
                            onSelectRangeDate({
                              startDate: startDate || new Date(),
                              endDate: endDate || startDate || new Date()
                            });
                            this.toggleModal();
                            this.stepper.nextStep();
                          }}
                          style={{
                            flexGrow: 1
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              textAlign: "center",
                              marginRight: 8,
                              fontWeight: "bold",
                              marginVertical: 8
                            }}
                          >
                            Hoàn tất
                          </Text>
                        </Button>
                      </Row>
                    </View>
                  }
                />
              </View>
            </Modal>
          </View>
        );
        break;
      default:
        return (
          <View stule={style}>
            <TouchableOpacity onPress={this.toggleModal}>
              {this.props.children({
                startDate: startDate || new Date(),
                endDate: endDate || startDate || new Date()
              })}
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} style={{ borderRadius: 8 }}>
              <View>
                <Stepper
                  ref={ref => (this.stepper = ref)}
                  stepCount={2}
                  step0={
                    <View
                      style={{
                        justifyContent: "center",
                        backgroundColor: "#ffffff",
                        padding: 8,
                        borderRadius: 8
                      }}
                    >
                      <Row>
                        <Col
                          fillParent
                          centerVertical
                          style={{
                            backgroundColor: "#f3f3f3",
                            padding: 6,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8
                          }}
                        >
                          <Shape type="circle" size={15} color={"#ff6600"} />
                          <Text
                            style={{
                              color: "#000000",
                              alignSelf: "center",
                              marginTop: 8,
                              fontSize: 13
                            }}
                          >
                            Ngày bắt đầu
                          </Text>
                          {startDate && (
                            <Text
                              style={{
                                alignSelf: "center",
                                color: "#000000",
                                marginTop: 4,
                                fontSize: 11
                              }}
                            >
                              ({startDate})
                            </Text>
                          )}
                        </Col>

                        <Col fillParent centerVertical style={{ padding: 6 }}>
                          <Shape type="circle" size={15} color={"#ececec"} />
                          <Text
                            style={{
                              color: "#c3c3c3",
                              alignSelf: "center",
                              marginTop: 8
                            }}
                          >
                            Ngày kết thúc
                          </Text>
                        </Col>
                      </Row>
                      <Divider style={{ marginTop: 0 }} />

                      <CalendarList
                        // Enable horizontal scrolling, default = false
                        horizontal={true}
                        // Enable paging on horizontal, default = false
                        pagingEnabled={true}
                        // Set custom calendarWidth.
                        calendarWidth={300}
                        style={{ width: 300, alignSelf: "center" }}
                        current={startDate || new Date()}
                        markedDates={{
                          [moment(startDate, "YYYY-MM-DD").format(
                            "YYYY-MM-DD"
                          )]: {
                            selected: true,
                            //marked: true,
                            selectedColor: "#ff6600"
                          }
                        }}
                        onDayPress={date => {
                          console.log(date);
                          this.setState({
                            startDate: date.dateString
                          });
                        }}
                        onDayLongPress={day => {}}
                        monthFormat={"'Tháng' MM 'năm' yyyy"}
                      />
                      <Divider />
                      <Row rightContent>
                        <Button
                          onPress={() => {
                            this.close();
                          }}
                          style={{
                            flexGrow: 1
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              textAlign: "center",
                              marginRight: 8,
                              marginVertical: 8
                            }}
                          >
                            Huỷ bỏ
                          </Text>
                        </Button>

                        <Button
                          onPress={() => {
                            this.setState(
                              {
                                endDate: startDate
                              },
                              () => {
                                this.stepper.nextStep();
                              }
                            );
                          }}
                          style={{
                            flexGrow: 1
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              textAlign: "center",
                              marginRight: 8,
                              fontWeight: "bold",
                              marginVertical: 8
                            }}
                          >
                            Tiếp Theo
                          </Text>
                        </Button>
                      </Row>
                    </View>
                  }
                  step1={
                    <View
                      style={{
                        justifyContent: "center",
                        backgroundColor: "#ffffff",
                        padding: 8,
                        borderRadius: 8
                      }}
                    >
                      <Row>
                        <Col fillParent centerVertical>
                          <Shape
                            type="circle"
                            size={15}
                            color={"#ececec"}
                            style={{ padding: 6 }}
                          />
                          <Text
                            style={{
                              color: "#c3c3c3",
                              alignSelf: "center",
                              marginTop: 8,
                              fontSize: 13
                            }}
                          >
                            Ngày bắt đầu
                          </Text>
                          {startDate && (
                            <Text
                              style={{
                                alignSelf: "center",
                                color: "#000000",
                                marginTop: 4,
                                fontSize: 11
                              }}
                            >
                              {startDate}
                            </Text>
                          )}
                        </Col>

                        <Col
                          fillParent
                          centerVertical
                          style={{
                            backgroundColor: "#ececec",
                            padding: 6,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8
                          }}
                        >
                          <Shape type="circle" size={15} color={"#ff6600"} />
                          <Text
                            style={{
                              color: "#000000",
                              alignSelf: "center",
                              marginTop: 8,
                              fontSize: 13
                            }}
                          >
                            Ngày kết thúc
                          </Text>
                          {endDate && (
                            <Text
                              style={{
                                alignSelf: "center",
                                color: "#000000",
                                marginTop: 4,
                                fontSize: 11
                              }}
                            >
                              ({endDate})
                            </Text>
                          )}
                        </Col>
                      </Row>
                      <Divider style={{ marginTop: 0 }} />
                      <CalendarList
                        // Enable horizontal scrolling, default = false
                        horizontal={true}
                        // Enable paging on horizontal, default = false
                        pagingEnabled={true}
                        // Set custom calendarWidth.
                        calendarWidth={300}
                        style={{ width: 300, alignSelf: "center" }}
                        current={endDate || startDate}
                        markingType={
                          endDate !== startDate && endDate
                            ? "period"
                            : undefined
                        }
                        markedDates={{
                          ...(endDate !== startDate && endDate
                            ? {
                                [moment(startDate, "YYYY-MM-DD").format(
                                  "YYYY-MM-DD"
                                )]: {
                                  color: "#ff6600",
                                  textColor: "#ffffff",
                                  startingDay: true
                                },
                                ...this._getAllDatesBetween(),
                                [moment(endDate, "YYYY-MM-DD").format(
                                  "YYYY-MM-DD"
                                )]: {
                                  color: "#ff6600",
                                  textColor: "#ffffff",
                                  endingDay: true
                                }
                              }
                            : {
                                [moment(startDate, "YYYY-MM-DD").format(
                                  "YYYY-MM-DD"
                                )]: {
                                  selected: true,
                                  selectedColor: "#ff6600"
                                }
                              })
                        }}
                        onDayPress={date => {
                          console.log(date);
                          this.setState({
                            endDate: date.dateString
                          });
                        }}
                        minDate={startDate}
                        onDayLongPress={day => {}}
                        monthFormat={"'Tháng' MM 'năm' yyyy"}
                      />
                      <Divider />
                      <Row>
                        <Button
                          onPress={() => {
                            this.stepper.previousStep();
                          }}
                          style={{
                            flexGrow: 1
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              textAlign: "center",
                              marginRight: 8,
                              marginVertical: 8
                            }}
                          >
                            Quay lại
                          </Text>
                        </Button>

                        <Button
                          onPress={() => {
                            onSelectRangeDate({
                              startDate: startDate || new Date(),
                              endDate: endDate || startDate || new Date()
                            });
                            this.toggleModal();
                            this.stepper.nextStep();
                          }}
                          style={{
                            flexGrow: 1
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              textAlign: "center",
                              marginRight: 8,
                              fontWeight: "bold",
                              marginVertical: 8
                            }}
                          >
                            Hoàn tất
                          </Text>
                        </Button>
                      </Row>
                    </View>
                  }
                />
              </View>
            </Modal>
          </View>
        );
    }
  }
}

export default DateRangePicker;
