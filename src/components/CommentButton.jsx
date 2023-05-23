import React from "react";

const CommentButton = ({children, className, disabled, ...props}) => {
  return (
    <button {...props} className={className} type="submit" disabled={disabled}>
      {children}
    </button>
  )
};

export default CommentButton;
