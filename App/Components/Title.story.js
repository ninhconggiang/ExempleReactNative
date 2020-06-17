import React from "react";
import { storiesOf } from "@storybook/react-native";

import Title from "./Title";

storiesOf("Title")
  .add("Default", () => <Title />)
  .add("Login Title", () => (
    <Title
      title={"ĐĂNG NHẬP"}
      titleStyle={{
        color: "#DB5F0E",
        fontSize: 35,
        fontWeight: 700,
      }}
      dividerColor={'#ffffff'}
    />
  ));
