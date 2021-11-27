import { AUTHORIZED_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useAuthorizedUser = variables => {

    const { data, loading, fetchMore, ...result } = useQuery(AUTHORIZED_USER, {
        fetchPolicy: "no-cache",
        variables,
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
          return;
        }
    
        fetchMore({
            variables: {
              after: data.authorizedUser.reviews.pageInfo.endCursor,
              ...variables,
            },
        });
    };
    
    const authorizedUser = data && data.authorizedUser ? data.authorizedUser : null;
    
    return { authorizedUser, loading, fetchMore: handleFetchMore, ...result };
};

export default useAuthorizedUser;