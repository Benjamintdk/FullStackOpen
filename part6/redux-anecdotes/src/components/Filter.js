import React from 'react'
import { useDispatch } from 'react-redux'
import { filterSearch } from '../reducers/FilterReducer'

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange= (event) => {
        event.preventDefault()
        const search = event.target.value
        dispatch(filterSearch(search))
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

export default Filter