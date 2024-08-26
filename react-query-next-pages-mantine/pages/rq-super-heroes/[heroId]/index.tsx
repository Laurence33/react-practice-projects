import { useRouter } from 'next/router';
import { useSuperHeroData } from '@/hooks/useSuperHeroData';

export function index() {
  const router = useRouter();
  const { heroId } = router.query;

  if (!heroId) {
    return <h3>Not Found</h3>;
  }

  const { isLoading, isError, error, data } = useSuperHeroData(heroId?.toString());
  if (isLoading) return <h3>Loading...</h3>;

  if (isError) return <h3>Error: {error.message}</h3>;

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
}

export default index;
