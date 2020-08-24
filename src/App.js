import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <p>Components go here.</p>
        </div>
      </Switch>
    </Router>
  );
}
export default App;
