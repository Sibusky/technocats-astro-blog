import React from "react";

const FormButton = ({ children, className, disabled, ...props }) => {
  return (
    <button {...props} className={className} type="submit">
      {children}
    </button>
  );
};

export default FormButton;
