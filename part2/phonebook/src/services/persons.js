import axios from 'axios'
/* For express serving static files with build */
const baseURL = "/api/persons"

const getAll = () => axios.get(baseURL).then(response => response.data)

const createEntry = newPerson => axios.post(baseURL, newPerson).then(response => response.data)

const updateEntry = (id, newPerson) => axios.put(`${baseURL}/${id}`, newPerson).then(response => response.data)

const deleteEntry = id => axios.delete(`${baseURL}/${id}`)

const personServices = { getAll, createEntry, updateEntry, deleteEntry }

export default personServices 
