import HandThumbsUpIcon from "../assets/HandThumbsUpIcon.jsx";
import HandThumbsDownIcon from "../assets/HandThumbsDownIcon.jsx";
import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../js/firestoreConfig.js";

const CommentButtons = ({
                            comment,
                            postId,
                            comId,
                        }) => {
    const commentId = doc(db, "comments",`post-${postId}`, "comments-list", comId)
    const [likes, setLikes] = useState(comment.likes);
    const [dislikes, setDislikes] = useState(comment.dislikes);

    const handleLikeClick = async () => {
        const rating = await getDoc(commentId)
        const likes = {
            likes: rating.data().likes + 1
        }
        setLikes(likes.likes)
        await updateDoc(commentId, likes)
       }

    const handleDislikeClick = async () => {
        const rating = await getDoc(commentId)
        const dislikes = {
            dislikes: rating.data().dislikes + 1
        }
        setDislikes(dislikes.dislikes)
        await updateDoc(commentId, dislikes)
    }

    return (
        <div className="comment__likebuttons">
            <button
                onClick={handleLikeClick}
                className="comment__like"
                type="button"
                aria-label="Полезно"
            >
                <HandThumbsUpIcon likes={likes}/>
            </button>
            <button
                onClick={handleDislikeClick}
                className="comment__like"
                type="button"
                aria-label="Бесполезно"
            >
                <HandThumbsDownIcon dislikes={dislikes}/>
            </button>
        </div>
    );
};

export default CommentButtons;