import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
let config

const setToken = newToken => {
    token = `bearer ${newToken}`
    config = config = {
        headers: { Authorization: token }
    }
}

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = async newPost => {
    const response = await axios.post(baseUrl, newPost, config)
    return response.data
}

const update = async (id, updatedPost) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedPost, config)
    return response.data
}

const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`, config)
}

const postService = { getAll, create, update, remove, setToken }

export default postService
