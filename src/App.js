/* 
  Start here and work your way down the nested components.
  Not all files in the project need code added.
  Look at each file to see what props need to be passed!
*/

// Import the state hook
import React, { useState } from 'react';
// Import the Posts (plural!) and SearchBar components, since they are used inside App component
import Posts from './components/Posts/Posts';
import SearchBar from './components/SearchBar/SearchBar';
// Import the dummyData
import dummyData from './dummy-data';
import './App.css';

const App = () => {
  // Create a state called `posts` to hold the array of post objects, **initializing to dummyData**.
  // This state is the source of truth for the data inside the app. You won't be needing dummyData anymore.
  // To make the search bar work (which is stretch) we'd need another state to hold the search term.
  const [posts, setPosts] = useState(dummyData);
  const [filteredPostIds, setFilteredPostIds] = useState(posts.map((post) => post.id));

  const likePost = postId => {
    /*
      This function serves the purpose of increasing the number of likes by one, of the post with a given id.

      The state of the app lives at the top of the React tree, but it wouldn't be fair for nested components not to be able to change state!
      This function is passed down to nested components through props, allowing them to increase the number of likes of a given post.

      Invoke `setPosts` and pass as the new state the invocation of `posts.map`.
      The callback passed into `map` performs the following logic:
        - if the `id` of the post matches `postId`, return a new post object with the desired values (use the spread operator).
        - otherwise just return the post object unchanged.
     */
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return {...post, likes: post.likes + (post.liked ? -1 : 1), liked: !post.liked};
      } else {
        return post;
      }
    }));
  };

  const searchPosts = searchTerm => {
    setFilteredPostIds(posts.reduce((filtered, post) => {
      if (!searchTerm || post.username.includes(searchTerm)) {
        filtered.push(post.id)
      }
      return filtered;
    }, []));
  };

  const showCommentField = postId => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return {...post, showComment: !post.showComment};
      } else {
        return post;
      }
    }));
  };

  const addComment = (postId, target) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        const newComment = {
          id: 22, // id would be generated when adding to database
          username: 'current_user', // would be generated using authentication
          text: target.value
        };
        return {...post, comments: [...post.comments, newComment]};
      } else {
        return post;
      }
    }));
    target.value = '';
  };

  return (
    <div className='App'>
      {<SearchBar searchPosts={searchPosts} />}
      {<Posts 
        posts={posts} 
        likePost={likePost} 
        filteredPostIds={filteredPostIds} 
        addComment={addComment} 
        showCommentField={showCommentField}
      />}
    </div>
  );
};

export default App;
