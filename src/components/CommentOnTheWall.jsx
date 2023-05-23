import PersonIcon from "../assets/PersonIcon.jsx";
import HandThumbsUpIcon from "../assets/HandThumbsUpIcon.jsx";
import HandThumbsDownIcon from "../assets/HandThumbsDownIcon.jsx";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../js/firestoreConfig.js";

const CommentOnTheWall = ({
  // id,
  comment,
  // postId,
  handleLikeClick,
  handleDisLikeClick,
  // likes,
  // dislikes,
}) => {

  return (
    <div className="comment" key={comment.id}>
      <div className="info-about-comment">
        <PersonIcon />
        <h3 className="comment-author">{comment.author}</h3>
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
};

export default CommentOnTheWall;
