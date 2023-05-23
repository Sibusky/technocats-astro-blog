import React, { useEffect, useState } from "react";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../js/firestoreConfig";

export default function Buttons({ id }) {
  const [rating, setRating] = useState({
    likes: 0,
    dislikes: 0,
  });

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const docRef = doc(db, "rating", `post-${id}`);

  useEffect(() => {
    getRating();
  }, []);

  useEffect(() => {
    if (localStorage.getItem(`post-${id}-lastVote`) === "liked") {
      setIsLiked(true);
      setIsDisliked(false);
    } else if (localStorage.getItem(`post-${id}-lastVote`) === "disliked") {
      setIsLiked(false);
      setIsDisliked(true);
    } else {
      return;
    }
  }, []);

  async function getRating() {
    const rating = await getDoc(docRef);
    if (rating.exists()) {
      setRating({
        likes: rating.data().likes,
        dislikes: rating.data().dislikes,
      });
    } else {
      // if rating doesn't exists, creating new one
      const newRating = { likes: 0, dislikes: 0 };
      await setDoc(docRef, newRating);
    }
  }

  async function clickLike() {
    const lastVote = localStorage.getItem(`post-${id}-lastVote`);
    if (!lastVote) {
      localStorage.setItem(`post-${id}-lastVote`, "liked");
      setRating({
        likes: ++rating.likes,
        dislikes: rating.dislikes,
      });
      setIsLiked(true);
      setIsDisliked(false);
      await updateDoc(docRef, rating);
    } else if (lastVote === "liked") {
      return;
    } else if (lastVote === "disliked") {
      localStorage.removeItem(`post-${id}-lastVote`);
      localStorage.setItem(`post-${id}-lastVote`, "liked");
      setRating({
        likes: ++rating.likes,
        dislikes: --rating.dislikes,
      });
      setIsLiked(true);
      setIsDisliked(false);
      await updateDoc(docRef, rating);
    } else {
      console.log("Vote type is not correct");
      return;
    }
  }

  async function clickDislike() {
    const lastVote = localStorage.getItem(`post-${id}-lastVote`);
    if (!lastVote) {
      localStorage.setItem(`post-${id}-lastVote`, "disliked");
      setRating({
        likes: rating.likes,
        dislikes: ++rating.dislikes,
      });
      setIsLiked(false);
      setIsDisliked(true);
      await updateDoc(docRef, rating);
    } else if (lastVote === "liked") {
      localStorage.removeItem(`post-${id}-lastVote`);
      localStorage.setItem(`post-${id}-lastVote`, "disliked");
      setRating({
        likes: --rating.likes,
        dislikes: ++rating.dislikes,
      });
      setIsLiked(false);
      setIsDisliked(true);
      await updateDoc(docRef, rating);
    } else if (lastVote === "disliked") {
      return;
    } else {
      console.log("Vote type is not correct");
      return;
    }
  }

  return (
    <div className="button__container">
      <button
        className={`button button-like ${isLiked ? "button__selected" : null}`}
        id="like"
        onClick={() => clickLike()}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/svg/1f44d.svg"
          width="30"
          height="30"
        />
        <span className="app-reaction-emoji-count-like">{rating.likes}</span>
      </button>
      <button
        className={`button button-dislike ${
          isDisliked ? "button__selected" : null
        }`}
        id="dislike"
        onClick={() => clickDislike()}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/svg/1f44e.svg"
          width="30"
          height="30"
        />
        <span className="app-reaction-emoji-count-dislike">
          {rating.dislikes}
        </span>
      </button>
    </div>
  );
}
