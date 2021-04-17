import api from './instance'

// books
export const fetchBooks = (query) => {
  return api.get('/books/', {
    params: { query }
  })
}

export const fetchSimilarBooks = bookId => {
  return api.get(`/books/like/${bookId}`)
}

export const fetchBook = (bookId) => {
  return api.get(`/books/${bookId}`)
}

export const createBook = (bookId, values) => {
  const data = new FormData()

  for (let key in values)
    data.append(key, values[key])

  return api.post('/books', data)
}

export const updateBook = (bookId, values) => {
  const data = new FormData()

  for (let key in values)
    data.append(key, values[key])

  return api.post(`/books/${bookId}`, data)
}

export const deleteBook = (bookId, values) => {
  return api.delete(`/books/${bookId}`)
}

// authentication
export const register = params => {
  return api.post('/users/add', params)
}

export const login = params => {
  return api.post('/auth/login', params)
}

export const logout = () => {
  return api.get('/auth/logout')
}

export const getUser = () => {
  return api.get('/auth/user')
}

// orders
export const createOrder = values => {
  const data = new FormData()

  for (let key in values)
    data.append(key, values[key])

  return api.post('/orders')
}

export const fetchOrders = () => {
  return api.get('/orders')
}

export const fetchAllOrders = () => {
  return api.get('/orders/all')
}
