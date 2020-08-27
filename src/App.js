import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import Navigation from './components/Navigation/Navigation';
import ProductContainer from './containers/ProductContainer';
import BrandContainer from './containers/BrandContainer';
import SaleContainer from './containers/SaleContainer';

import seed from './seed';

export const CLOUD_NAME = 'dwfq3yxlm';


//seed()

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Navigation />
          <Route exact path = '/' component={Home}/>

          <Route path = '/products/:params1/:params2' component={ProductContainer}/>
          <Route path = '/brands' component={BrandContainer} />
          <Route path = '/sales' component={SaleContainer} />
        </div>
      </Switch>
    </Router>
  );
}
export default App;
