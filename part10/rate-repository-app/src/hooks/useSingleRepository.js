import { REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useSingleRepository = variables => {

    const { data, loading, fetchMore, ...result } = useQuery(REPOSITORY, {
        fetchPolicy: "cache-and-network",
        variables,
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
            variables: {
              after: data.repository.reviews.pageInfo.endCursor,
              ...variables,
            },
        });
    };
    
    const repository = data && data.repository ? data.repository : null;
    
    return { repository, loading, fetchMore: handleFetchMore, ...result };
};

export default useSingleRepository;