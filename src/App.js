import React from 'react';
import './App.scss';
import './mobile.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './containers/Home';
import Navigation from './components/Navigation/Navigation';
import BrandContainer from './containers/BrandContainer';
import SaleContainer from './components/SalesPage/SaleContainer';
import RegisterContainer from './components/Register/RegisterOrLogin';
import CartContainer from './components/CartPage/CartContainer';
import ProductShow from './components/ProductShow/ProductShow';
import ShopContainer from './components/Shop/ShopContainer';

export const CLOUD_NAME = 'dwfq3yxlm';
export const BASE_URL = 'http://localhost:8080';

function App(props) {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Navigation />
          <Route exact path = '/' component={Home}/>

          <Route exact path = '/products/:params1/:params2' component={ShopContainer}/>
          <Route exact path = '/products/:id' component={ProductShow} />
          <Route exact path = '/products' component={ShopContainer} />
          
          <Route path = '/cart' component={CartContainer} />

          <Route path = '/brands' component={BrandContainer} />
          <Route path = '/sales' component={SaleContainer} />
          <Route path = '/register'>
            {props.token ? <Redirect to='/'/> : <RegisterContainer />}
          </Route>

          <footer>
           <p>greenpaws &copy; 2020</p>
          </footer>
        </div>
      </Switch>
    </Router>
  );
}
const mstp = state => {
  return {
    token: state.users.token
  }
}
export default connect(mstp, null)(App);
