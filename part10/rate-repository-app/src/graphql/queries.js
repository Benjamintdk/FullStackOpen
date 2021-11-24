import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
            node {
              id
              fullName
              ratingAverage
              reviewCount
              stargazersCount
              forksCount
              description
              language
              ownerAvatarUrl
            }
        }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
        id
        username
    }
  }
`;