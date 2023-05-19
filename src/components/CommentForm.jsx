import React from 'react';



export default function CommentForm() {

    return (
        <div className="comment-form">
            <h3 className="popup__title">Leave your Comment</h3>
            <form name="comment-form">
                <div className="input-container">
                    <input id="name-author" name="name-author" type="text"
                        placeholder="Name" required />
                    <span id="error-name-author" className="error-message"></span>
                </div>
                <div className="input-container">
                    <input id="comment-text" name="comment-text" type="text"
                        placeholder="Your Comment" required />
                    <span id="error-comment-text" className="error-message"></span>
                </div>
                <button className="comment-form__button" type="submit">Submit your Comment</button>
            </form>
        </div>
    )
}