import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Homepage from './views/Homepage'

const App = () => {
  return <main>
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Homepage}/>
      </Switch>
    </Router>
  </main>
}

export default App;
