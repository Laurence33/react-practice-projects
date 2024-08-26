import { useQuery } from 'react-query';
import axios from 'axios';

const fetcher = (heroId: string) => axios.get(`http://localhost:4000/superheroes/${heroId}`);
export const useSuperHeroData = (heroId: string) =>
  useQuery(['super-hero', heroId], () => fetcher(heroId));
