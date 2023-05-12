import React, { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export default function Buttons({ id }) {
  const [rating, setRating] = useState({
    likes: 0,
    dislikes: 0,
  });

  const firebaseConfig = {
    apiKey: "AIzaSyD9nqE3bvUrZ1RBEJfZq-Q2gvhlVVWa588",
    authDomain: "blog-rating-22da6.firebaseapp.com",
    projectId: "blog-rating-22da6",
    storageBucket: "blog-rating-22da6.appspot.com",
    messagingSenderId: "341277539245",
    appId: "1:341277539245:web:65b6889ab30241b11abf24",
    measurementId: "G-1VZQ0CFXP1",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const docRef = doc(db, "rating", `post-${id}`);

  useEffect(() => {
    getRating();
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
      await updateDoc(docRef, rating);
    } else if (lastVote === "liked") {
      localStorage.removeItem(`post-${id}-lastVote`);
      localStorage.setItem(`post-${id}-lastVote`, "disliked");
      setRating({
        likes: --rating.likes,
        dislikes: ++rating.dislikes,
      });
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
        className="button button-like"
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
        className="button button-dislike"
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
