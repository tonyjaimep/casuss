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

export const createBook = values => {
  return api.post('/books', values)
}

export const updateBook = (bookId, values) => {
  return api.post(`/books/${bookId}`, values)
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
  return api.post('/orders', values)
}

export const updateOrder = (id, values) => {
  return api.post(`/orders/${id}`, values)
}

export const fetchOrders = () => {
  return api.get('/orders')
}

export const fetchAllOrders = () => {
  return api.get('/orders/all')
}

export const fetchShippingOptions = () => {
  return api.get('/shipping-options')
}

export const createShippingOption = values => {
  return api.post('/shipping-options', values)
}

export const updateShippingOption = (id, values) => {
  return api.post(`/shipping-options/${id}`, values)
}
