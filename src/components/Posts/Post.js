import React from 'react';
import Comments from '../Comments/Comments';
import LikeSection from './LikeSection';
import PostHeader from './PostHeader';

const Post = props => {
  // 🔥 Make sure the parent of Post is passing the right props!
  const { post, likePost, addComment, showCommentField } = props;

  return (
    <div className='post-border'>
      <PostHeader
        username={post.username}
        thumbnailUrl={post.thumbnailUrl}
      />
      <div className='post-image-wrapper'>
        <img
          alt='post thumbnail'
          className='post-image'
          src={post.imageUrl}
        />
      </div>
      {/* Is LikeSection getting all the props it needs to work correctly? */}
      <LikeSection 
        likePost={() => likePost(post.id)} 
        numberOfLikes={post.likes} 
        isLiked={post.liked} 
        showCommentField={() => showCommentField(post.id)}
      />
      {/* Comments also wants its props! */}
      <Comments 
        post={post} 
        comments={post.comments} 
        addComment={addComment}
      />
    </div>
  );
};

export default Post;
