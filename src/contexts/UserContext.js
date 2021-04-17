import { useContext, useReducer, createContext } from 'react'

const UserContext = createContext();

const userReducer = (state, action) => {
  console.log("Dispatching action")
  console.log(action)

  switch (action.type) {
    case 'login':
      return { user: action.user }
    case 'logout':
    default:
      return null
  }
}

const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, null)

  const value = { state, dispatch }

  return <UserContext.Provider value={value} children={children}/>
}

const useUser = (user) => {
  const context = useContext(UserContext)

  if (context === undefined)
    throw new Error("useUser must be used within a UserProvider")

  return context
}

export { UserProvider, useUser };
