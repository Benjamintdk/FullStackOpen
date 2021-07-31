import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddPost from './AddPost'

test('check createPost event handler functionality', () => {
    const createPost = jest.fn()
    const component = render(<AddPost createPost={createPost} />)

    const title = component.container.querySelector('#title')
    const form = component.container.querySelector('form')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
        target: { value: 'FullStack Open' }
    })

    fireEvent.change(author, {
        target: { value: 'mlukkai' }
    })

    fireEvent.change(url, {
        target: { value: 'fullstackopen.com' }
    })

    fireEvent.submit(form)

    expect(createPost.mock.calls).toHaveLength(1)
    expect(createPost.mock.calls[0][0].title).toBe('FullStack Open')
    expect(createPost.mock.calls[0][0].author).toBe('mlukkai')
    expect(createPost.mock.calls[0][0].url).toBe('fullstackopen.com')

})