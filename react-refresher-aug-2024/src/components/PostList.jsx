import { useState } from 'react';
import NewPost from './NewPost';
import Post from './Post';
import classes from './PostList.module.css';
import Modal from './Modal';

function PostList({ isModalOpen, toggleModal }) {
  const [posts, setPosts] = useState([]);
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
      {posts.length && (
        <ul className={classes.posts}>
          {posts.map((p, i) => (
            <Post key={i} author={p.author} text={p.text} />
          ))}
        </ul>
      )}
      {!posts.length && (
        <div style={{ textAlign: 'center', color: '#ece1fa' }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostList;
