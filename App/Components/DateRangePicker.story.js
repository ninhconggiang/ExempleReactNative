import React from "react";
import { Text } from 'react-native';
import { storiesOf } from "@storybook/react-native";

import DateRangePicker from "./DateRangePicker";

storiesOf("DateRangePicker").add("Default", () => (
  <DateRangePicker onSelectRangeDate={(startDate, endDate) => {}}>
    {({ startDate, endDate }) => {
      return (
        <View>
          <Text>{startDate}-</Text>
          <Text>{endDate}</Text>
        </View>
      );
    }}
  </DateRangePicker>
));
