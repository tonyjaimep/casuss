import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Homepage from './views/Homepage'
import Search from './views/Search'

const App = () => {
  return <main>
    <Router>
      <Switch>
        <Route path="/search/:query?" component={Search}/>
        <Route path="/" exact={true} component={Homepage}/>
      </Switch>
    </Router>
  </main>
}

export default App;
