import React from "react";

const FormButton = ({children, className, disabled, ...props}) => {
  return (
    <button {...props} className={className} type="submit" disabled={disabled}>
      {children}
    </button>
  )
};

export default FormButton;
