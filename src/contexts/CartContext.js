import { useContext, useReducer, createContext } from 'react'

const CartContext = createContext([]);

const cartReducer = (state, action) => {
  console.log("Dispatching action")
  console.log(action)

  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          book: action.book,
          quantity: action.quantity
        }
      ]
    case 'change quantity':
      return state.map(entry => {
        if (entry.book._id === action.book) {
          entry.quantity = action.quantity
        }
        return entry
      })
    case 'remove':
      return state.filter(entry => entry.book._id !== action.book)
    default:
      return null
  }
}

const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, [])

  const value = { state, dispatch }

  return <CartContext.Provider value={value} children={children}/>
}

const useCart = () => {
  const context = useContext(CartContext)

  if (context === undefined)
    throw new Error("useCart must be used within a CartProvider")

  return context
}

export { CartProvider, useCart };
