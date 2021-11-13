import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import React from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {

  const results = useQuery(ALL_AUTHORS)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ ALL_AUTHORS ]
  })

  const [ name, setName ] = useState('')
  const [ birthYear, setBirthYear ] = useState('')

  if (results.loading) {
    return <div>loading...</div>
  }

  const authors = results.data.allAuthors

  if (!props.show) {
    return null
  }

  const changeBirthYear = async (event) => {
    event.preventDefault()

    await editAuthor({ variables: { name, birthYear } })

    setBirthYear('')
    setName('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <h2>Set birth year</h2>
      <form onSubmit={changeBirthYear} >
        <div>name: <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map(a => 
            <option key={a.name} value={a.name}>{a.name}</option>)
          }
      </select></div>
        <div>born: <input value={birthYear} onChange={({ target }) => setBirthYear(target.value)} /></div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
