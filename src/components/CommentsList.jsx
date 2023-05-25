import React, { useState, useEffect } from "react";
import CommentButton from "./CommentButton";
import CommentInput from "./CommentInput";
import useFormWithValidation from "./FormValidator";

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
// import { CommentOnTheWall } from "./CommentOnTheWall.jsx";
// import CommentButtons from "./CommentButtons.jsx";

export function CommentsList({ id }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  // const [author, setAuthor] = useState("");
  // const [comment, setComment] = useState("");
  // const [fullComments, setFullComments] = useState([]);

  const docRef = doc(db, "comments", `post-${id}`);
  const commentsCollection = collection(docRef, "comments-list");

  // useEffect(() => {
  //   getComments();
  // }, []);

  // async function getComments() {
  //   const comments = await getDocs(commentsCollection);
  //   let fullCom = [];
  //   comments.forEach((comment) => {
  //     fullCom.push({
  //       id: comment.id,
  //       data: comment.data(),
  //     });
  //   });
  //   setFullComments(fullCom.sort((a, b) => a.data.id - b.data.id));
  // }

  function showMessage(user) {
    return `Message from author ${user} has sent for moderation. Soon it will appear on site`;
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
    // getComments();
    resetForm();
  }

  return (
    <>
      <div className="comment-form">
        <form name="comment-form">
          <div className="input-container">
            <CommentInput
              tag="input"
              value={values.author}
              onChange={handleChange}
              id="name-author"
              name="author"
              type="text"
              placeholder="Name"
              required
              minLength="2"
              maxLength="30"
              pattern="^[А-Яа-яa-zA-ZёЁ][А-Яа-яa-zA-ZёЁ\s\-]+"
            ></CommentInput>
            <span id="error-name-author" className="error-message">
              {errors.author}
            </span>
          </div>
          <div className="input-container">
            <CommentInput
              tag="textarea"
              value={values.comment}
              onChange={handleChange}
              id="comment-text"
              name="comment"
              type="text"
              placeholder="Here you can leave your comment and share your impressions"
              required
              minLength="20"
              maxLength="500"
            ></CommentInput>
            <span id="error-comment-text" className="error-message">
              {errors.comment}
            </span>
          </div>
          <CommentButton
            onClick={(e) => {
              e.preventDefault();
              addComment();
            }}
            disabled={isValid ? false : true}
            className={
              isValid
                ? "link secondary filled comment_button"
                : "link secondary comment_button_inactive"
            }
          >
            <span>Add your Comment</span>
          </CommentButton>
        </form>
      </div>
    </>
  );
}
