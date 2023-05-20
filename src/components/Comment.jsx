import React from "react";
import PersonIcon from "../assets/PersonIcon";
import HandThumbsUpIcon from "../assets/HandThumbsUpIcon";
import HandThumbsDownIcon from "../assets/HandThumbsDownIcon";
import CommentButton from "./CommentButton";
import CommentInput from "./CommentInput";

export default function Comment() {
  const [commentsList, setCommentsList] = React.useState([
    {
      id: 1,
      comment: "test comment 1",
      author: "John Doe",
      date: "01.01.2020",
    },
    { id: 2, comment: "test comment 2", author: "Alisa", date: "01.01.2020" },
    {
      id: 3,
      comment: "test comment 3",
      author: "Bob",
      date: new Date().toLocaleDateString(),
    },
  ]);

  const [author, setAuthor] = React.useState("");
  const [comment, setComment] = React.useState("");

  const addComment = (e) => {
    e.preventDefault();
    //console.log(author);
    const newComment = {
      id: Date.now(),
      author,
      comment,
      date: new Date().toLocaleDateString(),
    };
    setCommentsList([...commentsList, newComment]);
    setAuthor("");
    setComment("");
  };

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
                  <HandThumbsUpIcon />
                </button>
                <button type="button" aria-label="Полезно">
                  <HandThumbsDownIcon />
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
          <CommentButton onClick={addComment}>
            Submit your Comment
          </CommentButton>
        </form>
      </div>
    </>
  );
}
