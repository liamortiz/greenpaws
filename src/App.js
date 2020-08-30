import React from 'react';
import './App.scss';
import './mobile.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import Navigation from './components/Navigation/Navigation';
import ProductContainer from './containers/ProductContainer';
import BrandContainer from './containers/BrandContainer';
import SaleContainer from './containers/SaleContainer';
import Footer from './containers/Footer';
import RegisterContainer from './components/Register/RegisterContainer';

import seed from './seed';

export const CLOUD_NAME = 'dwfq3yxlm';
export const BASE_URL = 'http://localhost:8080';


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
          <Route path = '/register' component={RegisterContainer} />
          <Footer />
        </div>
      </Switch>
    </Router>
  );
}
export default App;
