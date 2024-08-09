import { useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';
import classes from './PostList.module.css';
import Modal from './Modal';

const posts = [
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
  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={toggleModal}>
        <NewPost onCancel={toggleModal} />
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
