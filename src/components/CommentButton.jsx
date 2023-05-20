import React from "react";

const CommentButton = ({children, ...props}) => {
  return (
    <button {...props} className="comment-form__button">
      {children}
    </button>
  )
};

export default CommentButton;
