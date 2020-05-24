import React, { FC } from "react";
import { uploadFile } from "./upload";
import Icon from "../Icon/icon";
import  { Progress } from "../Progress/progress";

export interface UpLoadListProps {
  fileList: uploadFile[];
  onRemove: (_file: uploadFile) => void;
}

export const UpLoadList: FC<UpLoadListProps> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className="upload-list">
      {fileList.map((item) => {
        return (
          <li className="upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="primary" />
              {item.name}
            </span>
            <span className="file-status">
              {item.status === "uploading" && (
                <Icon icon="spinner" spin theme="primary"></Icon>
              )}
              {item.status === "success" && (
                <Icon icon="check-circle" theme="success"></Icon>
              )}
              {item.status === "error" && (
                <Icon icon="times-circle" theme="danger"></Icon>
              )}
            </span>
            <span className="file-actions">
              <Icon icon="times" onClick={() => onRemove(item)}></Icon>
            </span>
            {item.status === "uploading" && (
              <Progress percent={item.percent || 0} />
            )}
          </li>
        );
      })}
    </ul>
  );
};
export default UpLoadList;
