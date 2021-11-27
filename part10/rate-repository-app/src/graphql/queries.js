import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW_DETAILS, PAGE_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
    query repositories(
        $orderDirection: OrderDirection,
        $orderBy: AllRepositoriesOrderBy,
        $searchKeyword: String,
        $first: Int,
        $after: String
    ) {
    repositories(
        orderDirection: $orderDirection, 
        orderBy: $orderBy,
        searchKeyword: $searchKeyword
        first: $first
        after: $after
    ) {
        edges {
            node {
              ...RepositoryDetails
            }
        }
        pageInfo {
            ...PageDetails
        }
    }
  }
  ${REPOSITORY_DETAILS}
  ${PAGE_DETAILS}
`;

export const REPOSITORY = gql`
    query repository($id: ID!, $first: Int, $after: String) {
        repository(id: $id) {
            ...RepositoryDetails
            reviews(first: $first, after: $after) {
                edges {
                node {
                    ...ReviewDetails
                }
                }
                pageInfo {
                    ...PageDetails
                }
            }
        }
    }
    ${REPOSITORY_DETAILS}
    ${REVIEW_DETAILS}
    ${PAGE_DETAILS}
`;

export const AUTHORIZED_USER = gql`
  query authorizedUser($first: Int, $after: String) {
    authorizedUser {
        id
        username
        reviews(first: $first, after: $after) {
            edges {
                node {
                    ...ReviewDetails
                }
            }
            pageInfo {
                ...PageDetails
            }
        }
    }
  }
  ${REVIEW_DETAILS}
  ${PAGE_DETAILS}
`;
