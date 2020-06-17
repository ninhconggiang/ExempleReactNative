import React from "react";
import { storiesOf } from "@storybook/react-native";

import List from "./List";

storiesOf("List").add("Default", () => (
  <List
    horizontal
    hideScrollBar={true}
    renderItem={({ item, index }) => {
      return null;
    }}
  />
));
