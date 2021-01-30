import React from 'react';
import Comment from './Comment';
import './Comments.css';

const Comments = props => {
  // 🔥 Make sure the parent of Comments is passing the right props!
  const { post, comments, addComment } = props;

  return (
    <div>
      {comments.map((comment, index) => {
        return <Comment comment={comment} key={index} />
      })}
      {
        post.showComment &&
        <input 
          className="add-comment" 
          type="text" 
          placeholder="Add a comment..." 
          onKeyDown={(event) => {if (event.key === "Enter") addComment(post.id, event.target)}}
        ></input>
      }
    </div>
  );
};

export default Comments;
