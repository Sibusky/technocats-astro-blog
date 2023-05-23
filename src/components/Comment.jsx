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
  const [fullComment, setFullComment] = useState([]);

  const docRef = doc(db, "comments", `post-${id}`);
  const commentsCollection = collection(docRef, "comments-list");

  useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    const comments = await getDocs(commentsCollection);
    let fullCom = []
    comments.forEach( (comment) => {
      fullCom.push({
        id: comment.id,
        data: comment.data(),
      })
      // console.log(comment.id);
    });
    setFullComment(fullCom.sort((a, b) => a.data.id - b.data.id));
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
      {fullComment.map(com =>  (
          <CommentOnTheWall key={com.id} id={com.id} comment={com.data} postId={id}/>
        )
      )}
      <div className="comment-form">
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
            <span>Add your Comment</span>
          </CommentButton>
        </form>
      </div>
    </>
  );
}
