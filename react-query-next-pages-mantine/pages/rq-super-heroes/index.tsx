import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => axios.get('http://localhost:4000/superheroes');
function index() {
  const { isLoading, data } = useQuery('super-heroes', fetchSuperHeroes);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <h2>RQ Super Heroes</h2>
      {data?.data.map((d: any) => <div key={d.name}>{d.name}</div>)}
    </>
  );
}

export default index;
