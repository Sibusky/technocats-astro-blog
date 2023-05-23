import React from "react";

const CommentButton = ({children, ...props}) => {
  return (
    <button {...props} className="link secondary filled comment_button" type="submit">
      {children}
    </button>
  )
};

export default CommentButton;
