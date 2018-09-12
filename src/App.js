import React, { Component } from 'react'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import Note from './Note'
import Notes from './Notes'
import fire from './fire'


class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header>
          <h1>Jotpad</h1>
          <Link to='/'>Home</Link>
        </header>
        <Notes />
        <main>
          <Switch>
            <Route path='/notes/:id' component={Note} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
