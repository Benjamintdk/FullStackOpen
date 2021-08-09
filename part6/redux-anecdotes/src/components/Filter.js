import React from 'react'
import { filterSearch } from '../reducers/FilterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

    const handleChange= (event) => {
        event.preventDefault()
        const search = event.target.value
        props.filterSearch(search)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default connect(null, { filterSearch })(Filter)