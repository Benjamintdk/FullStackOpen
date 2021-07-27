import axios from 'axios'
const baseUrl = "http://localhost:3003/api/blogs"

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = async newPost => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newPost, config)
    return response.data
}

const postService = { getAll, create, setToken }

export default postService
