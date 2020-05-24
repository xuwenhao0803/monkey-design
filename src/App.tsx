import React, { useState } from "react";
import Menu from "./componets/Menu/menu";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./componets/Menu/menuItem";
import SubMenu from "./componets/Menu/subMenu";
import { uploadFile } from "./componets/Upload/upload";
import Icon from "./componets/Icon/icon";
import Transition from "./componets/Transition/transition";
import Button from "./componets/Button/Button";
// import axios from "axios";
import { Upload } from "./componets/Upload/upload";

import {
  DataSourceType,
  AutoComplete,
} from "./componets/AutoComplete/autoComplete";

library.add(fas);
const App: React.FC = () => {
  const [show, setShow] = useState(false);
  // const [title, setTitle] = useState("");
  // const data = [
  //   { value: "苹果", number: 1 },
  //   { value: "红苹果", number: 2 },
  //   { value: "香蕉", number: 3 },
  //   { value: "青香蕉", number: 4 },
  // ];
  // const fetch = (obj: string) => {
  //   return data.filter((item) => item.value.includes(obj));
  // };

  const fetchData = (query: string) => {
    return fetch(`http://jsonplaceholder.typicode.com/posts`)
      .then((res) => res.json())
      .then((res) => {
        return res
          .slice(0, 10)
          .map((item: any) => ({ value: item.title, ...item }));
      });
  };

  const renderop = (item: DataSourceType) => {
    return (
      <>
        <h2>name:{item.value}</h2>
        <span>number:{item.number}</span>
      </>
    );
  };
  // const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const uloadedFile = files[0];
  //     const formData = new FormData();
  //     formData.append(uloadedFile.name, uloadedFile);
  //     axios
  //       .post("http://jsonplaceholder.typicode.com/posts", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //       });
  //   }
  // };
  const defaultFileList: uploadFile[] = [
    {
      uid: "123",
      size: 1234,
      name: "hello.md",
      status: "uploading",
      percent: 30,
    },
    { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
    { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
  ];
  // const handleBefore = (file: File) => {
  //   if (file.size / 1024 > 50) {
  //     alert("上传文件大小超过限制");
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };
  return (
    <div className="App">
      <Menu defaultIndex={"0"} mode="horizontal" defaultOpenSubMenus={["3"]}>
        <MenuItem>click</MenuItem>
        <MenuItem>click1</MenuItem>
        <MenuItem disabled>click2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
        </SubMenu>
      </Menu>
      <Icon icon="arrow-down" theme="primary" size="10x" />
      <Button onClick={() => setShow(!show)}>开关</Button>
      <Transition in={show} timeout={300} animationName="zoom-in-top">
        <div>
          <p>12</p>
          <p>122</p>
          <p>1222</p>
          <p>12222</p>
        </div>
      </Transition>
      <Transition in={show} timeout={300} wapper animationName="zoom-in-top">
        <Button btnType="primary">dasda</Button>
      </Transition>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        defaultFileList={defaultFileList}
        name="filename"
        data={{ key: "value" }}
        headers={{ "X-mokeny": "lufy" }}
        accept=".jpg"
        multiple={true}
      
        onRemove={() => {}}
        onSuccess={() => {}}
      ></Upload>
      <AutoComplete
        fetchSuggestions={fetchData}
        renderOption={renderop}
      ></AutoComplete>
    </div>
  );
};

export default App;
