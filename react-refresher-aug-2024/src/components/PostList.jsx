import { useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';
import classes from './PostList.module.css';
import Modal from './Modal';

const initialPosts = [
  {
    author: 'Laurence',
    text: 'React.js is awesome!',
  },
  {
    author: 'Julie',
    text: 'Testing only!',
  },
];
function PostList({ isModalOpen, toggleModal }) {
  const [posts, setPosts] = useState(initialPosts);
  function addNewPost(post) {
    setPosts((prevPosts) => {
      return [...prevPosts, post];
    });
  }
  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={toggleModal}>
        <NewPost onCancel={toggleModal} onAddNewPost={addNewPost} />
      </Modal>
      <ul className={classes.posts}>
        {posts.map((p, i) => (
          <Post key={i} author={p.author} text={p.text} />
        ))}
      </ul>
    </>
  );
}

export default PostList;
