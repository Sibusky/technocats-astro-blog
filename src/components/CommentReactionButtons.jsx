export default function CommentReactionButtons({ children, reaction }) {
  return (
    <div className="comment__like_wrapper">
      <div className="comment__like_icon">{children}</div>
      <span>{reaction}</span>
    </div>
  );
}
