import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
    fragment RepositoryDetails on Repository {
        id
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        forksCount
        description
        language
        ownerAvatarUrl
        url
    }
`;

export const PAGE_DETAILS = gql`
    fragment PageDetails on PageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
    }
`;

export const REVIEW_DETAILS = gql`
    fragment ReviewDetails on Review {
        id
        repositoryId
        rating
        createdAt
        text
        user {
            id
            username
        }
    }
`;
