import classes from './Modal.module.css';
export default function Modal({ isOpen, closeModal, children }) {
  return (
    <>
      <div
        onClick={closeModal}
        className={classes.backdrop}
        style={{ display: isOpen ? 'block' : 'none' }}
      />
      <dialog open={isOpen} className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}
