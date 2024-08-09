import classes from './NewPost.module.css';

function NewPost({ author, onAuthorChange, onBodyChange, body, onCancel }) {
  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea
          id="body"
          required
          rows={3}
          onChange={onBodyChange}
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
          onChange={onAuthorChange}
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
