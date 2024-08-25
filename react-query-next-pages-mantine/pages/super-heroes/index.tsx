import axios from 'axios';
import { useEffect, useState } from 'react';

function index() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes').then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
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
