import PersonIcon from "../assets/PersonIcon.jsx";
import HandThumbsUpIcon from "../assets/HandThumbsUpIcon.jsx";
import HandThumbsDownIcon from "../assets/HandThumbsDownIcon.jsx";
import React from "react";

// SSR export
export const prerender = false;

export function CommentOnTheWall({
  comment,
  handleLikeClick,
  handleDisLikeClick,
}) {
  return (
    <div className="comment" key={comment.id}>
      <div className="info-about-comment">
        <PersonIcon />
        <h4 className="comment-author">{comment.author}</h4>
        <p>{comment.date}</p>
      </div>
      <p className="comment__text">{comment.comment}</p>
      <div className="comment__likebuttons">
        <button
          onClick={handleLikeClick}
          className="comment__like"
          type="button"
          aria-label="Полезно"
        >
          <HandThumbsUpIcon likes={comment.likes} />
        </button>
        <button
          onClick={handleDisLikeClick}
          className="comment__like"
          type="button"
          aria-label="Бесполезно"
        >
          <HandThumbsDownIcon dislikes={comment.dislikes} />
        </button>
      </div>
    </div>
  );
}
