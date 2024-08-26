import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

const fetcher = ({ queryKey }) =>
  axios.get(`http://localhost:4000/colors?_page=${queryKey[1]}&_per_page=2`);
function index() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['colors', pageNumber],
    fetcher,
    {
      keepPreviousData: true, // show the previous data (page:1) while fetching the new data (page:2)
    }
  );
  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error: {error.message}</h3>;
  return (
    <>
      <ul>{data?.data?.data.map((c: any) => <li key={c.id}>{c.label}</li>)}</ul>
      <button
        type="button"
        onClick={() => setPageNumber((prev) => prev - 1)}
        disabled={!data?.data.prev}
      >
        Previous
      </button>
      <button
        type="button"
        onClick={() => setPageNumber((prev) => prev + 1)}
        disabled={!data?.data.next}
      >
        Next
      </button>
      {isFetching && 'Loading new data...'}
    </>
  );
}

export default index;
