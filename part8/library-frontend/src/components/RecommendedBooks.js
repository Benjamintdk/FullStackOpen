import React from "react"
import { GET_LOGGED_USER, ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const RecommendedBooks = (props) => {

    const user =  useQuery(GET_LOGGED_USER)
    const results = useQuery(ALL_BOOKS)

    if (results.loading || user.loading) {
        return <div>loading...</div>
    }

    const favoriteGenre = user.data.me.favoriteGenre
    const books = results.data.allBooks
    
    
  if (!props.show) {
    return null
  }


    return (
        <div>
            <h1>Recommendations</h1>
            <p>books in your favourite genre <b>{favoriteGenre}</b></p>
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
                {books.filter(book => 
                    book.genres.includes(favoriteGenre))
                    .map(b =>
                    <tr key={b.title}>
                    <td key="title">{b.title}</td>
                    <td key="author">{b.author.name}</td>
                    <td key="published">{b.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default RecommendedBooks