import api from './instance'

// books
export const fetchBooks = () => {
  return api.get('/books/')
}

export const fetchBook = (bookId) => {
  return api.get(`/books/${bookId}`)
}

export const updateBook = (bookId, values) => {
  const data = new FormData()

  for (let key in values)
    data.append(key, values[key])

  return api.post(`/books/${bookId}`)
}

export const deleteBook = (bookId, values) => {
  return api.delete(`/books/${bookId}`)
}

// authentication
export const login = params => {
  return api.post('/auth/login', params)
}

export const logout = () => {
  return api.get('/auth/logout')
}

export const getUser = () => {
  return api.get('/auth/user')
}
