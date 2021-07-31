import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Post from './Post'

describe('checks post has been rendered correctly', () => {
    let component
    let mockupdateLikes
    let mockdeletePost
    beforeEach(() => {
        const post = {
            title: 'FullStack Open',
            author: 'mlukkai',
            url: 'fullstackopen.com',
            likes: 100
        }
        mockupdateLikes = jest.fn()
        mockdeletePost = jest.fn()
        component = render(<Post post={post} updateLikes={mockupdateLikes} deletePost={mockdeletePost} />)
    })

    test('renders only blog title and author, and not number of likes or url', () => {

        expect(component.container).toHaveTextContent(
            'FullStack Open - mlukkai'
        )

        expect(component.container.querySelector('.urllikes')).toHaveStyle('display: none')

    })

    test('checks url and likes are shown on button click', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        expect(component.container.querySelector('.urllikes')).not.toHaveStyle('display: none')
    })

    test('checks if likes is incremented by 2 if like button is clicked twice', () => {
        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockupdateLikes.mock.calls).toHaveLength(2)
    })
})