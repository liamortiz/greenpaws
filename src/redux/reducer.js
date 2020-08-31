import { combineReducers } from 'redux';
import sampleReducer from './sample';
import cart from './cart';

export default combineReducers({
    samples: sampleReducer,
    carts: cart
})