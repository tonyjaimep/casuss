import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Homepage from './views/Homepage'
import Search from './views/Search'
import Book from './views/Book'

import Navigation from './components/Navigation'

const App = () => {
  return <main>
    <Router>
      <Navigation/>
      <Switch>
        <Route path="/books/:id" component={Book}/>
        <Route path="/search/:query?" component={Search}/>
        <Route path="/" exact={true} component={Homepage}/>
      </Switch>
    </Router>
  </main>
}

export default App;
