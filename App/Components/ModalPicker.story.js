import React from "react";
import { storiesOf } from "@storybook/react-native";

import ModalPicker from "./ModalPicker";

storiesOf("ModalPicker")
  .add("Default", () => <ModalPicker />)
  .add("Function", () => (
    <ModalPicker>
      {({ currentValue, currentLabel }) => {
        return <View />;
      }}
    </ModalPicker>
  ));
