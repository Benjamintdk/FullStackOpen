import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = variables => {

  const { data, fetchMore, loading, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          ...variables,
        },
    });
  };

  const repositories = data && data.repositories ? data.repositories : [];

  return { repositories, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepositories;