import { BASE_URL } from '../App';
const ADD_PRODUCT   = 'users/ADD_PRODUCT';

// Reducer is in charge of persisting
const user = JSON.parse(sessionStorage.getItem('user'));
const defaultState = {
  user: {
    productsInCart: user ? user['user']['products_in_cart'] : [],
    cartId: user ? user['user']['cart']['id'] : -1,
    id: user ? user['user']['id'] : -1
  }
}

export default function sampleReducer(state=defaultState, action = {}) {
  switch (action.type) {
    case ADD_PRODUCT:
        state.user.productsInCart.push(action.payload);
        return {...state};
    default: return state;
  }
}
export function addProduct(product) {
  console.log(product);
  return { type: ADD_PRODUCT,  payload: product};
}

// perform the fetch calls here
export function addProductAsync(productId, cartId) {
    return (dispatch) => fetch(BASE_URL + '/cart_products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('user')).jwt}`,
        accepts: 'application/json'
      },
      body: JSON.stringify({'cart_products': {'cart_id': cartId, 'product_id': productId}})
    })
    .then(resp => resp.json())
    .then(product => dispatch(addProduct(product)));
}