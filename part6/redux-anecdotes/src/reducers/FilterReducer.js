export const filterSearch = filter => {
    return {
        type: 'FILTER',
        filter
    }
}

const FilterReducer = (state = '', action) => {

    switch (action.type) {
        case 'FILTER':
            return action.filter
        default:
            return state
    }
}

export default FilterReducer