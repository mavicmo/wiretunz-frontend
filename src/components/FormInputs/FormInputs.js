import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label className="labelDiv">{label}</label>
      <input
        className="inputDiv"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
      />
      <span className="errorSpan">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
