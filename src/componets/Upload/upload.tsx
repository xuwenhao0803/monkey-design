import React, { FC, useRef, ChangeEvent, useState, Children } from "react";
import axios from "axios";
import UploadList from "./upLoadList";
import Dragger from "./dragger";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

export interface uploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  onChange?: (file: File) => void;
  defaultFileList?: uploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onRemove?: (file: uploadFile) => void;
  name?: string;
  headers?: { [key: string]: any };
  data?: { [key: string]: any };
  withCredentials?: boolean;
  accept: string;
  multiple?: boolean;
  drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    defaultFileList,
    onRemove,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<uploadFile[]>(defaultFileList || []);
  const btnCilck = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const changeProcessStatus = (
    uploadFile: uploadFile,
    updateObj: Partial<uploadFile>
  ) => {
    setFileList((preList) => {
      return preList.map((item) => {
        if (item.uid === uploadFile.uid) {
          return { ...item, ...updateObj };
        } else {
          return item;
        }
      });
    });
  };
  const handleRemove = (file: uploadFile) => {
    setFileList((pre) => {
      return pre.filter((item) => !(item.uid === file.uid));
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    fileUpload(files);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const fileUpload = (files: FileList) => {
    let postFiles = Array.from(files);

    postFiles.forEach((file) => {
      if (!beforeUpload) {
        postFile(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            postFile(processedFile);
          });
        } else if (result !== false) {
          postFile(file);
        }
      }
    });
  };
  const postFile = (file: File) => {
    const _file: uploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || file.name, file);

    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            changeProcessStatus(_file, {
              percent: percentage,
              status: "uploading",
            });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        changeProcessStatus(_file, {
          status: "success",
          response: resp.data,
        });
        if (onSuccess) {
          onSuccess(resp.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        changeProcessStatus(_file, { status: "error", error: err });
        if (onChange) {
          onChange(file);
        }
        if (onError) {
          onError(err, file);
        }
      });
  };
  console.log(fileList);
  return (
    <div className="upload-component">
      <div
        className="upload-input"
        onClick={btnCilck}
        style={{ display: "inline-block" }}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              fileUpload(files);
            }}
          >
            {Children}
          </Dragger>
        ) : (
          children
        )}
        <input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          className="file-input"
          style={{ display: "none" }}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};
export default Upload;

Upload.defaultProps = {
  name: "file",
};
