import React from "react";

function InputField({ id, label, type, value, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="form-control"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default InputField;
