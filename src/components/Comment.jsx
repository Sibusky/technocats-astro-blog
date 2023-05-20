import React, { useState, useEffect } from "react";
import PersonIcon from "../assets/PersonIcon";
import HandThumbsUpIcon from "../assets/HandThumbsUpIcon";
import HandThumbsDownIcon from "../assets/HandThumbsDownIcon";
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

export default function Comment({ id }) {
  const [commentsList, setCommentsList] = useState([]);

  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  const docRef = doc(db, "comments", `post-${id}`);
  const commentsCollection = collection(docRef, "comments-list");

  useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    const comments = await getDocs(commentsCollection);
    let commentsList = [];
    comments.forEach((comment) => {
      commentsList.push(comment.data());
      console.log(comment.id);
    });
    setCommentsList(commentsList.sort((a, b) => a.id - b.id));
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

  return (
    <>
      {commentsList &&
        commentsList.map((comment) => {
          return (
            <div className="comment" key={comment.id}>
              <div className="info-about-comment">
                <PersonIcon />
                <h4 className="comment-author">{comment.author}</h4>
                <p>{comment.date}</p>
              </div>
              <p className="comment__text">{comment.comment}</p>
              <div className="comment__buttons">
                <button type="button" aria-label="Полезно">
                  <HandThumbsUpIcon likes={comment.likes} />
                </button>
                <button type="button" aria-label="Бесполезно">
                  <HandThumbsDownIcon dislikes={comment.dislikes} />
                </button>
              </div>
            </div>
          );
        })}
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
