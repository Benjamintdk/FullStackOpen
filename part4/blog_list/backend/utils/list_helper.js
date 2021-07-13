const _ = require("lodash")

const dummy = blogs => 1

const totalLikes = blogs => {
    const reducer = (sum, item) => sum + item.likes
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    const mostLikes = blogs.reduce((prev, cur) => prev.likes > cur.likes ? prev : cur)
    return (({ title, author, likes }) => ({ title, author, likes }))(mostLikes)
}

const mostBlogs = blogs => {
    const blogArr = _.map(blogs, 'author')
    const authMostBlogs = _.chain(blogArr).countBy().toPairs().max(_.last).value()
    return { 'author': authMostBlogs[0], 'blogs': authMostBlogs[1] }
}

const mostLikes = blogs => {
    const blogArr = _.chain(blogs).groupBy('author').map(a => 
        ({ 'author': a[0].author, 'likes': _.sumBy(a, 'likes')})).value()
    const authMostLikes = _.maxBy(blogArr, 'likes')
    return authMostLikes
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
