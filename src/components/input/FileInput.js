import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";

const FileInput = (props) => {
  const onChange = props.onChange;

  const customFileUpload = {
    border: "1px solid #ccc",
    display: "inline-block",
    padding: "6px 12px",
    cursor: "pointer",
  };
  const inputFile = {
    display: "none",
  };

  const [avatar, setAvatar] = useState();

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar);
    };
  }, [avatar]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log("before compress file", file);
    // console.log(URL.createObjectURL(file));
    // setAvatar(file);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log("compressed image", compressedFile);
      setAvatar(compressedFile);
      onChange(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label className="btn btn-light btn-sm" style={customFileUpload}>
        <input
          type="file"
          style={inputFile}
          accept=".jpg, .jpeg, .png"
          onChange={handleChange}
        />
        Custom Upload
      </label>
    </div>
  );
};

export default FileInput;
