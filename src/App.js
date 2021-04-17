import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Homepage from './views/Homepage'
import Search from './views/Search'
import Book from './views/Book'
import Profile from './views/Profile'
import Admin from './views/Admin'

import Login from './views/Login'
import Register from './views/Register'

import Navigation from './components/Navigation'

import { UserProvider } from './contexts/UserContext'

const App = () => {
  return <main>
    <UserProvider>
      <Router>
        <Navigation/>
        <Switch>
          <Route path="/admin/:action?" exact={true} component={Admin}/>
          <Route path="/profile/:action?" exact={true} component={Profile}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/books/:id" component={Book}/>
          <Route path="/search/:query?" component={Search}/>
          <Route path="/" exact={true} component={Homepage}/>
        </Switch>
      </Router>
    </UserProvider>
  </main>
}

export default App;
