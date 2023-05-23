import React, { useState, useEffect } from "react";
import CommentButton from "./CommentButton";
import CommentInput from "./CommentInput";
import useFormWithValidation from './FormValidator';

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

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [fullComments, setFullComments] = useState([]);

  const docRef = doc(db, "comments", `post-${id}`);
  const commentsCollection = collection(docRef, "comments-list");

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
    });
    setFullComments(fullCom.sort((a, b) => a.data.id - b.data.id));
  }

  async function addComment() {
    if (!(values.author && values.comment)) {
      return;
    }
    const commentsRef = await getDoc(docRef);
    // if doc doesn't exist, create one
    if (!commentsRef.exists()) {
      await setDoc(docRef, {});
    }

    const newComment = {
      id: Date.now(),
      author: values.author,
      comment: values.comment,
      date: new Date().toLocaleDateString(),
      likes: 0,
      dislikes: 0,
    };
    await addDoc(commentsCollection, newComment);
    getComments();
    resetForm();
  }

  async function handleLikeClick(commentId) {
    const commentRef = doc(commentsCollection, commentId);
    const rating = await getDoc(commentRef);
    const lastVote = localStorage.getItem(`post-${id}-${commentId}-lastVote`);

    if (!lastVote) {
      localStorage.setItem(`post-${id}-${commentId}-lastVote`, "liked");
      const newRating = {
        likes: ++rating.data().likes,
      };
      await updateDoc(commentRef, newRating);
    } else if (lastVote === "liked") {
      return;
    } else if (lastVote === "disliked") {
      localStorage.removeItem(`post-${id}-${commentId}-lastVote`);
      localStorage.setItem(`post-${id}-${commentId}-lastVote`, "liked");
      const newRating = {
        likes: ++rating.data().likes,
        dislikes: --rating.data().dislikes,
      };
      await updateDoc(commentRef, newRating);
    }
    getComments();
  }

  async function handleDisLikeClick(commentId) {
    const commentRef = doc(commentsCollection, commentId);
    const rating = await getDoc(commentRef);
    const lastVote = localStorage.getItem(`post-${id}-${commentId}-lastVote`);

    if (!lastVote) {
      localStorage.setItem(`post-${id}-${commentId}-lastVote`, "disliked");
      const newRating = {
        dislikes: ++rating.data().dislikes,
      };
      await updateDoc(commentRef, newRating);
    } else if (lastVote === "disliked") {
      return;
    } else if (lastVote === "liked") {
      localStorage.removeItem(`post-${id}-${commentId}-lastVote`);
      localStorage.setItem(`post-${id}-${commentId}-lastVote`, "disliked");
      const newRating = {
        likes: --rating.data().likes,
        dislikes: ++rating.data().dislikes,
      };
      await updateDoc(commentRef, newRating);
    }
    getComments();
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
          handleDisLikeClick={() => handleDisLikeClick(com.id)}
          likes={com.likes}
          dislikes={com.dislikes}
        />
      ))}
      <div className="comment-form">
        <form name="comment-form">
          <div className="input-container">
            <CommentInput
              value={values.author}
              onChange={handleChange}
              id="name-author"
              name="author"
              type="text"
              placeholder="Name"
              required
              minLength="2"
              maxLength="40"
            ></CommentInput>
            <span id="error-name-author" className="error-message">{errors.author}</span>
          </div>
          <div className="input-container">
            <CommentInput
              value={values.comment}
              onChange={handleChange}
              id="comment-text"
              name="comment"
              type="text"
              placeholder="Your Comment"
              required
              minLength="2"
              maxLength="500"
            ></CommentInput>
            <span id="error-comment-text" className="error-message">{errors.comment}</span>
          </div>
          <CommentButton
            onClick={(e) => {
              e.preventDefault();
              addComment();
            }}
            className={isValid ? "link secondary filled comment_button" : "link secondary comment_button_inactive"}
          >
            <span>Add your Comment</span>
          </CommentButton>
        </form>
      </div>
    </>
  );
}
