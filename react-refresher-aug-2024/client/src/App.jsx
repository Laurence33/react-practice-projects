import { useState } from 'react';
import MainHeader from './components/MainHeader';
import PostList from './components/PostList';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }
  return (
    <>
      <MainHeader onCreatePost={toggleModal} />
      <main>
        <PostList
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        ></PostList>
      </main>
    </>
  );
}

export default App;
