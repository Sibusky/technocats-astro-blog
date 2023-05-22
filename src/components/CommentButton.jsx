import React from "react";

const CommentButton = ({children, ...props}) => {
  return (
    <button {...props} className="comment-form__button" type="submit">
      {children}
    </button>
  )
};

export default CommentButton;
