import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => axios.get('http://localhost:4000/superheroes');
function index() {
  const { isLoading, isFetching, data, isError, error, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      // cacheTime: 3000, // in milliseconds // default 5mins
      // staleTime: 30000, // in milliseconds // default 0
      refetchOnMount: true, // default true, other: false | 'always'
      refetchOnWindowFocus: true, // default true, other: false | 'always'
    }
  );

  if (isLoading) return <h2>Loading...</h2>;

  if (isError) return <h2>Error: {error.message}</h2>;
  return (
    <>
      <h2>RQ Super Heroes</h2>

      <button type="button" onClick={refetch}>
        Reload
      </button>

      {data?.data.map((d: any) => <div key={d.name}>{d.name}</div>)}
    </>
  );
}

export default index;
