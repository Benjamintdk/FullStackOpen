import axios from 'axios'
const baseUrl = "http://localhost:3003/api/blogs"

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newPost => axios.post(baseUrl, newPost).then(response => response.data)

const postService = { getAll, create }

export default postService
