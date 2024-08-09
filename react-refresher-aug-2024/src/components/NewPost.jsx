import classes from './NewPost.module.css';
import { useState } from 'react';

function NewPost({ onCancel }) {
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');

  function changeBodyHandler(event) {
    setBody(event.target.value);
  }
  function changeAuthorHandler(event) {
    setAuthor(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      body,
      author,
    };
    console.log(data);
    onCancel();
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea
          id="body"
          required
          rows={3}
          onChange={changeBodyHandler}
          value={body}
        ></textarea>
      </p>
      <p>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          required
          value={author}
          onChange={changeAuthorHandler}
        />
      </p>

      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
