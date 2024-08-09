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
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');

  function changeBodyHandler(event) {
    setBody(event.target.value);
  }
  function changeAuthorHandler(event) {
    setAuthor(event.target.value);
  }

  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={toggleModal}>
        <NewPost
          body={body}
          onAuthorChange={changeAuthorHandler}
          onBodyChange={changeBodyHandler}
          onCancel={toggleModal}
        />
      </Modal>
      <ul className={classes.posts}>
        <Post author={author} text={body} />
        {posts.map((p, i) => (
          <Post key={i} author={p.author} text={p.text} />
        ))}
      </ul>
    </>
  );
}

export default PostList;
