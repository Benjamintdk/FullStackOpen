const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')
const mongoose = require('mongoose')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(helper.initialPosts)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(helper.listWithOneBlog)).toBe(5)
  })

  test('when list has multiple blogs, add up all the likes', () => {
    expect(listHelper.totalLikes(helper.initialPosts)).toBe(36)
  })

  test('when list has no blogs, equals no likes', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when there is only one blog post, that post has most likes', () => {
    expect(listHelper.favoriteBlog(helper.listWithOneBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when there are multiple blog posts, the post that has most likes', () => {
    expect(listHelper.favoriteBlog(helper.initialPosts)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})

describe('most blogs', () => {
  test('when there are multiple blog posts, the author with most posts', () => {
    const result = listHelper.mostBlogs(helper.initialPosts)
    expect(result).toEqual({
      'author': 'Robert C. Martin',
      'blogs': 3
    })
  })
})

describe('most likes', () => {
  test('when there are multiple blog posts, the author with most likes', () => {
    const result = listHelper.mostLikes(helper.initialPosts)
    expect(result).toEqual({
      'author': 'Edsger W. Dijkstra',
      'likes': 17
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})