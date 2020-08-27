import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ProductContainer from './containers/ProductContainer';
import Navigation from './components/Navigation';
import Home from './containers/Home';
import seed from './seed';

export const CLOUD_NAME = 'dwfq3yxlm';


//seed()

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Navigation />
          <Home />
          <ProductContainer />
        </div>
      </Switch>
    </Router>
  );
}
export default App;
