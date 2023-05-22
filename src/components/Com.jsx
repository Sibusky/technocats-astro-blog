import PersonIcon from "../assets/PersonIcon.jsx";
import HandThumbsUpIcon from "../assets/HandThumbsUpIcon.jsx";
import HandThumbsDownIcon from "../assets/HandThumbsDownIcon.jsx";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../js/firestoreConfig.js";

const Com = ({id, comment, postId}) => {
    const commentId = doc(db, "comments",`post-${postId}`, "comments-list", id)

    const handleLikeClick = async () => {
        const rating = await getDoc(commentId)
        const likes = {
            likes: rating.data().likes + 1
        }
        await updateDoc(commentId, likes)
    }

    const handleDisLikeClick = async () => {
        const rating = await getDoc(commentId)
        const dislikes = {
            dislikes: rating.data().dislikes - 1
        }
        await updateDoc(commentId, dislikes)
    }

    return (
        <div className="comment" key={comment.id}>
            <div className="info-about-comment">
                <PersonIcon />
                <h4 className="comment-author">{comment.author}</h4>
                <p>{comment.date}</p>
            </div>
            <p className="comment__text">{comment.comment}</p>
            <div className="comment__buttons">
                <button onClick={handleLikeClick} type="button" aria-label="Полезно">
                    <HandThumbsUpIcon likes={comment.likes} />
                </button>
                <button onClick={handleDisLikeClick} type="button" aria-label="Бесполезно">
                    <HandThumbsDownIcon dislikes={comment.dislikes} />
                </button>
            </div>
        </div>
    );
};

export default Com;