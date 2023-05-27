import React, { useState, useEffect } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import useFormWithValidation from "../js/FormValidator";

import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";

import { db } from "../js/firestoreConfig";

export function NewCommentForm({ id }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const [isMessageSent, setIsMessageSent] = useState(false);
  // const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);

  const docRef = doc(db, "comments", `post-${id}`);
  const commentsCollection = collection(docRef, "comments-list");

  function showMessage() {
    setIsMessageSent(true);
    setTimeout(() => {
      setIsMessageSent(false);
    }, 5000);
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
    resetForm();
    showMessage();
  }

  return (
    <>
      <div className="comment-form">
        <form name="comment-form">
          <div className="input-container">
            <FormInput
              tag="input"
              value={values.author}
              onChange={handleChange}
              id="name-author"
              name="author"
              type="text"
              placeholder="Your name"
              required
              minLength="2"
              maxLength="30"
              pattern="^[А-Яа-яa-zA-ZёЁ][А-Яа-яa-zA-ZёЁ\s\-]+"
            ></FormInput>
            <span id="error-name-author" className="error-message">
              {errors.author}
            </span>
          </div>
          <div className="input-container">
            <FormInput
              tag="textarea"
              value={values.comment}
              onChange={handleChange}
              id="comment-text"
              name="comment"
              type="text"
              placeholder="Here you can leave your comment and share your impressions"
              required
              minLength="10"
              maxLength="500"
            ></FormInput>
            <span id="error-comment-text" className="error-message">
              {errors.comment}
            </span>
          </div>
          {/* <ReCAPTCHA
            sitekey="6LfkAUAmAAAAAD3nCp4gMG7MBEuV-5yEp7ISV9pT"
            onChange={() => setIsCaptchaSuccess(true)}
          /> */}
          <FormButton
            onClick={(e) => {
              e.preventDefault();
              addComment();
            }}
            disabled={isValid 
              // && isCaptchaSuccessful 
              ? false 
              : true}
            className={
              isValid 
              // && isCaptchaSuccessful
                ? "link secondary filled comment_button"
                : "link secondary comment_button_inactive"
            }
          >
            <span>Add your Comment</span>
          </FormButton>
          {isMessageSent && (
            <small>
              Your comment has been submitted for moderation. After review, it
              will appear on the website.
            </small>
          )}
        </form>
      </div>
    </>
  );
}
