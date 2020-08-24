import React, { useState } from "react";

export const TextInput = ({ onTextChange, onBlur }) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);

    if (onTextChange) {
      onTextChange(e.target.value);
    }
  };

  return (
    <input onBlur={onBlur} className="p-4" type="text" onChange={onChange} value={value} />
  );
};
