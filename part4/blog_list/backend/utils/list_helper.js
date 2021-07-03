const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    const reducer = (sum, item) => sum + item.likes
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = blogs.reduce((prev, cur) => prev.likes > cur.likes ? prev : cur)
    return (({title, author, likes}) => ({title, author, likes}))(mostLikes)
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog
}
