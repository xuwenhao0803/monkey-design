import { configure, addDecorator, addParameters } from "@storybook/react";
import React from "react";
import { withInfo } from "@storybook/addon-info";
import "../src/styles/index.scss";
// automatically import all files ending in *.stories.js

const wrapperStyle: React.CSSProperties = {
  padding: "20px 40px",
};

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {stroyFn()}
  </div>
);
addDecorator(storyWrapper);
addDecorator(withInfo);
addParameters({ info: { inline: true, header: false } });
configure(require.context("../src", true, /\.stories\.tsx$/), module);
