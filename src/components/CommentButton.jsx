import React from "react";

const CommentButton = ({children, className, ...props}) => {
  return (
    <button {...props} className={className} type="submit">
      {children}
    </button>
  )
};

export default CommentButton;
