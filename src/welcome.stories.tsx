import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add(
  "welcome",
  () => {
    return (
      <>
        <h1>欢迎来到 monkey-design 组件库</h1>
        <p>利用react hooks +typescript编写的组件库</p>
        <h3>安装试试</h3>
        <code>npm i monkey-design --save</code>
      </>
    );
  },
  { info: { disable: true } }
);
