import React from "react";
import PersonIcon from "../assets/PersonIcon";
import HandThumbsUpIcon from "../assets/HandThumbsUpIcon";
import HandThumbsDownIcon from "../assets/HandThumbsDownIcon";

export default function Comment() {
  return (
    <div className="comment">
      <div className="info-about-comment">
        <PersonIcon />
        <h4 className="comment-author">Name author</h4>
        <p>Date</p>
      </div>
      <p className="comment__text">Your comment</p>
      <div className="comment__buttons">
        <button type="button" aria-label="Полезно">
          <HandThumbsUpIcon />
        </button>
        <button type="button" aria-label="Полезно">
          <HandThumbsDownIcon />
        </button>
      </div>
    </div>
  );
}
