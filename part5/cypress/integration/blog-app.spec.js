describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Ben',
            username: 'root',
            password: 'pass'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('log in')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('root')
            cy.get('#password').type('pass')
            cy.get('#login-button').click()
      
            cy.contains('Ben logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('root')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
    
            cy.get('.error').should('contain', 'Wrong Credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
    
            cy.get('html').should('not.contain', 'Ben logged in')
        })
      })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'root', password: 'pass' })
            cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' })
            cy.createBlog({ title: 'title2', author: 'author2', url: 'url2' })
            cy.createBlog({ title: 'title3', author: 'author2', url: 'url3' })
        })
    
        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('A Promised Land')
            cy.get('#author').type('Barack Obama')
            cy.get('#url').type('apromisedland.com')
            cy.get('#createpost').click()

            cy.contains('A Promised Land')
            cy.contains('Barack Obama')
            cy.contains('apromisedland.com')
        })

        it('A user can like a post', function () {
            cy.get('#title2')
                .contains('view')
                .click()

            cy.get('#title2')
                .contains('like')
                .click()

            cy.get('#title2')
                .get('.likes')
                .should('contain', 1)

        })
        it('A user can delete a post he/she created', function () {
            cy.get('#title1')
                .contains('remove')
                .click()

            cy.get('html').should('not.contain', 'title1')
        })

        it('Blog posts are sorted in order of likes', function () {
            cy.get('#title2')
                .contains('view')
                .click()

            cy.get('#title2')
                .contains('like')
                .click()

            cy.get('#title3')
                .contains('view')
                .click()

            cy.get('#title3')
                .contains('like')
                .click()

            cy.wait(200)

            cy.get('#title3')
                .contains('like')
                .click()
            
            cy.wait(200)

            cy.get('li').then((blogs) => {
                cy.wrap(blogs[0]).should('contain', 2)
                cy.wrap(blogs[1]).should('contain', 1)
                cy.wrap(blogs[2]).should('contain', 0)
            })


        })
    })
  })