import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            bookCount
            born
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author
        }
    }
` 

export const ADD_BOOK = gql`
  mutation newBook($author: String!, $title: String!, $published: String!, $genres: [String!]) {
    addBook(
      author: $author,
      title: $title,
      published: $published,
      genres: $genres
    ) {
      author
      id
      title
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation addBirthYear($name: String!, $birthYear: String!) {
      editAuthor(
          name: $name,
          birthYear: $birthYear
      ) {
          name
          bookCount
          id
          born
      }
  }
`
