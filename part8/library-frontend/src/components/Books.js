import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const results = useQuery(ALL_BOOKS)
  const [ genres, setGenres ] = useState([])
  const [ allBooks, setAllBooks ] = useState([])
  const [ filteredBooks, setFilteredBooks ] = useState([])

  // this use effect generates all the different genres available
  useEffect(() => {
    if (results.data) {
      const books = results.data.allBooks
      let allGenres = ['all genres']
      books.forEach(book => {
        book.genres.forEach(genre => {
          if (!allGenres.includes(genre)) {
            allGenres.push(genre)
          }
        })
      })
      setGenres(allGenres)
      setFilteredBooks(books)
      setAllBooks(books)
    }
  }, [results])

  // this use effect reloads the page based on the selected genre
  const submit = genre => {
    if (genre === "all genres") {
        setFilteredBooks(allBooks)
    } else {
        setFilteredBooks(allBooks.filter(book => book.genres.includes(genre)))
    }
  }

  if (results.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td key="title">{a.title}</td>
              <td key="author">{a.author.name}</td>
              <td key="published">{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre =>
          <button key={genre} onClick={() => submit(genre)}>
            {genre}
          </button>
        )}
      </div>
    </div>
  )
}

export default Books