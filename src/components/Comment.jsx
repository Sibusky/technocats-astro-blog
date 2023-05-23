import React, { useState, useEffect } from "react";
import CommentButton from "./CommentButton";
import CommentInput from "./CommentInput";

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";

import { db } from "../js/firestoreConfig";
import CommentOnTheWall from "./CommentOnTheWall.jsx";

export default function Comment({ id }) {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [fullComments, setFullComments] = useState([]);

  const docRef = doc(db, "comments", `post-${id}`);
  const commentsCollection = collection(docRef, "comments-list");
  // const commentRef = doc(docRef, 'comment-list', `${}`)

  useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    const comments = await getDocs(commentsCollection);
    let fullCom = [];
    comments.forEach((comment) => {
      fullCom.push({
        id: comment.id,
        data: comment.data(),
      });
      // console.log(comment.id);
    });
    setFullComments(fullCom.sort((a, b) => a.data.id - b.data.id));
  }

  async function addComment() {
    const newComment = {
      id: Date.now(),
      author,
      comment,
      date: new Date().toLocaleDateString(),
      likes: 0,
      dislikes: 0,
    };
    await addDoc(commentsCollection, newComment);
    getComments();
  }

  async function handleLikeClick(commentId) {
    const commentRef = doc(db, "comments", `post-${id}`, "comments-list", commentId);
    // const comment = fullComments.filter(comment => comment.id === commentId )

    const rating = await getDoc(commentRef);

    console.log(rating.data())
    

  }

  function handleDisLikeClick() {
    console.log("dislike");
  }

  return (
    <>
      {fullComments.map((com) => (
        <CommentOnTheWall
          key={com.id}
          id={com.id}
          comment={com.data}
          postId={id}
          handleLikeClick={() => handleLikeClick(com.id)}
          handleDisLikeClick={handleDisLikeClick}
          likes={com.likes}
          dislikes={com.dislikes}
        />
      ))}
      <div className="comment-form">
        <h3 className="popup__title">Leave your Comment</h3>
        <form name="comment-form">
          <div className="input-container">
            <CommentInput
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              id="name-author"
              name="name-author"
              type="text"
              placeholder="Name"
              required
            ></CommentInput>
            <span id="error-name-author" className="error-message"></span>
          </div>
          <div className="input-container">
            <CommentInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="comment-text"
              name="comment-text"
              type="text"
              placeholder="Your Comment"
              required
            ></CommentInput>
            <span id="error-comment-text" className="error-message"></span>
          </div>
          <CommentButton
            onClick={(e) => {
              e.preventDefault();
              addComment();
            }}
          >
            Submit your Comment
          </CommentButton>
        </form>
      </div>
    </>
  );
}
