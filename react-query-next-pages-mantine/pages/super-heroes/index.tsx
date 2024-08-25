import axios from 'axios';
import { useEffect, useState } from 'react';

function index() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/superheroe')
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>; // Display error message if one occurs.
  }
  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((d: any) => (
        <div key={d.name}>{d.name}</div>
      ))}
    </>
  );
}

export default index;
