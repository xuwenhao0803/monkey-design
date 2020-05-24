import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";

export interface DraggerProps {
  onFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile } = props;

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDraggerOVer(false);
    onFile(e.dataTransfer.files);
  };
  const handleDrag = (e: DragEvent<HTMLElement>, flag: boolean) => {
    e.preventDefault();
    setDraggerOVer(flag);
  };
  const [draggerOVer, setDraggerOVer] = useState(false);
  const cnames = classNames("uploader-dragger", {
    "is-dragOver": draggerOVer,
  });
  return (
    <div
      className={cnames}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
    </div>
  );
};

export default Dragger;
