import React from "react";
import { storiesOf } from "@storybook/react-native";

import GroupSelector from "./GroupSelector";

storiesOf("GroupSelector").add("Default", () => (
  <GroupSelector
    data={[
      {
        Value: "Value1",
        Name: "Name 1"
      },
      {
        Value: "Value",
        Name: "Name 2"
      }
    ]}
    valueExtractor={item => {
      return item.Value;
    }}
    labelExtractor={item => {
      return item.Name;
    }}
    onValueSubmit={value => {}}
  />
));
