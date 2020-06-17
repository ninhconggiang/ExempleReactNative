import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View } from "react-native";
import styles from "./Styles/DateStripPickerStyles";
import ExamplesRegistry from "../Services/ExamplesRegistry";
import CalendarStrip from "react-native-calendar-strip";
import { Images } from "../Themes";
import moment from "moment";
import Title from "./Title";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { isToday } from "../Utils/MomentUtils";
// import Icon from 'react-native-vector-icons/Ionicons';

// Get screen dimensions
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
// Initial state
const INITIAL_STATE = {};

// Note that this file (App/Components/DateStripPicker) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample("DateStripPicker", () => (
  <DateStripPicker />
));

class DateStripPicker extends Component {
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
    onSelectRangeDate: PropTypes.func,
  };

  // Set default prop values
  static defaultProps = {
    onSelectRangeDate: ({ startDate, endDate }) => {},
  };

  //Component's states
  state = {
    ...INITIAL_STATE,
    date: moment().format("DD/MM/YYYY"),
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { onSelectRangeDate } = this.props;
    const { date } = this.state;
    let customDatesStyles = [];
    let markedDates = [];
    return (
      <View style={{ padding: 6, paddingTop: 12 }}>
        <Title
          leftComponent={
            <SimpleLineIcons
              name="calendar"
              style={{ fontSize: 21, marginLeft: 6, marginLeft: 16 }}
            />
          }
          title={
            isToday(date, "YYYY-MM-DD")
              ? " HÔM NAY"
              : " " + moment(date, "YYYY-MM-DD").format("DD/MM/YYYY")
          }
          titleStyle={{
            color: "#5E5E5E",
            fontSize: 21,
            fontWeight: "300",
          }}
        />
        <CalendarStrip
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "border",
            duration: 300,
            highlightColor: "#ff6600",
            borderHighlightColor: "#ff6600",
            borderWidth: 2,
          }}
          style={{ paddingTop: 6, paddingBottom: 12 }}
          calendarHeaderStyle={{ color: "#000000", marginBottom: 12 }}
          dateNumberStyle={{ color: "#000000" }}
          dateNameStyle={{ color: "#000000" }}
          //iconLeft={Images.backButton}
          //iconRight={Images.closeButton}
          iconContainer={{ flex: 0.1 }}
          customDatesStyles={customDatesStyles}
          markedDates={markedDates}
          onDateSelected={(date) => {
            this.setState(
              {
                date: moment(date).format("YYYY-MM-DD"),
              },
              () => {
                onSelectRangeDate({
                  startDate: moment(date).format("YYYY-MM-DD"),
                  endDate: moment(date).format("YYYY-MM-DD"),
                });
              }
            );
          }}
        />
      </View>
    );
  }
}

export default DateStripPicker;
