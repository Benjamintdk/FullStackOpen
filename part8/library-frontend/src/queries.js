import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
    genres
  }
`

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
            ...BookDetails
        }
    }

${BOOK_DETAILS}
` 

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
  
${BOOK_DETAILS}
`

export const GET_LOGGED_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ADD_BOOK = gql`
  mutation newBook($author: String!, $title: String!, $published: Int!, $genres: [String!]) {
    addBook(
      author: $author,
      title: $title,
      published: $published,
      genres: $genres
    ) {
      author {
        name
      }
      title
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation addBirthYear($name: String!, $birthYear: Int!) {
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
