import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Product from './components/Product';

import faker from 'faker';

export const CLOUD_NAME = 'dwfq3yxlm';

//console.log(faker.commerce.price());

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Product />
        </div>
      </Switch>
    </Router>
  );
}
export default App;
