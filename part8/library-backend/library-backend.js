const { ApolloServer, UserInputError, PubSub, gql } = require('apollo-server')
const mongoose = require('mongoose')
const pubsub = new PubSub()
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const MONGODB_URI = 'mongodb+srv://Benjamin25:Breaking5%3F@cluster0.wwlt9.mongodb.net/graphql?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
      name: String!
      bookCount: Int!
      born: Int
      id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
  }

  type Mutation {
    addBook(
      author: String!
      title: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      birthYear: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (args.author) {
          const author = await Author.findOne({ name: args.author })

          if (author) {
            if (args.genre) {
              const booksByGenreAuthor = await Book.find({ 
                author: author.id, 
                genres: { $in: [args.genres] } }).populate('author')
              return booksByGenreAuthor
            }
  
            const booksByAuthor = await Book.find({ author: author.id })
  
            return booksByAuthor
          }

          return null
        }
      
        if (args.genre) {
          const booksByGenre = await Book.find({ genres: { $in: [args.genres] } }).populate('author')
          return booksByGenre
        }
        return await Book.find({}).populate('author')
      },
      allAuthors: async () => {
        return await Author.find({})
      },
      me: (root, args, context) => {
        return context.currentUser
      }
  },
  Author: {
      bookCount: async (root) => {
        const author = await Author.findOne({ name: root.name })
        const booksByAuthor = await Book.find({ author: author.id }) 
        return booksByAuthor.length
      }
  },
  Mutation: {
      addBook: async (root, args, { currentUser }) => {
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        const bookExists = await Book.findOne({ title: args.title })
        if (bookExists) {
          throw new UserInputError('Book already exists in the database.')
        }
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author, bookCount: 1 })
          await author.save()
        }
        const newAuthor = await Author.findOne({ name: args.author })
        const newBook = new Book({ ...args, author: newAuthor })
        try {
          await newBook.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        pubsub.publish("BOOK_ADDED", { bookAdded: newBook })

        return newBook
      },
      editAuthor: async (root, args, { currentUser }) => {
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        if (!args.name || !args.birthYear) {
          throw new UserInputError('Name or new year is missing')
        }

        const authorToUpdate = await Author.findOne({ name: args.name })

        if (!authorToUpdate) {
          return null
        }

        authorToUpdate.born = args.birthYear

        try {
          await authorToUpdate.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return authorToUpdate
      },
      createUser: (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('favoriteGenre')
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})