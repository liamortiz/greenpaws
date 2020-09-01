import { BASE_URL } from '../App';

const LOGIN   = 'users/LOGIN';
const ADD_PRODUCT_TO_CART = 'users/ADD_PRODUCT_TO_CART';
const REMOVE_PRODUCT = 'users/REMOVE_PRODUCT';

const defaultState = {
    user: {
        productsInCart: []
    },
    token: ''
}

export default function userReducer(state=defaultState, action = {}) {
  switch (action.type) {
    case LOGIN:
        const newState = {
            token: action.payload.jwt,
            user: {
                id: action.payload.user.id,
                cart: action.payload.user.cart,
                productsInCart: [...state.user.productsInCart, ...action.payload.user.products_in_cart]
            }
        }
        return {...state, ...newState};

    case ADD_PRODUCT_TO_CART:
        return {...state, user: {productsInCart: [...state.user.productsInCart, action.payload]}};
    case REMOVE_PRODUCT:
        return {...state, user: {productsInCart: [...state.user.productsInCart, action.payload]}}

    default: return state;
  }
}

export function loginUser(user) {
    return {type: LOGIN, payload: user}
}

// perform the fetch calls here
export function loginUserAsync({ email, password }) {
    return (dispatch) => fetch(BASE_URL + '/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json'
      },
      body: JSON.stringify({'user': {email, password}})
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.status !== 401) {
            dispatch(loginUser(data))
        } else {
            throw new Error("Invalid credentials")
        }
    });
}

export function registerUserAsync({ name, email, password }) {
    return (dispatch) => fetch(BASE_URL + '/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accepts: 'application/json'
        },
        body: JSON.stringify({'user': {name, email, password}})
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.status !== 401) {
            dispatch(loginUser(data))
        } else {
            throw new Error("Password is too short or user exist.")
        }
    });
}

export function addProduct(product) {
    console.log(product);
    return { type: ADD_PRODUCT_TO_CART,  payload: product};
  }
  
// perform the fetch calls here
export function addProductAsync(token, productId, cartId) {
    return (dispatch) => fetch(BASE_URL + '/cart_products', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        accepts: 'application/json'
    },
    body: JSON.stringify({'cart_products': {'cart_id': cartId, 'product_id': productId}})
    })
    .then(resp => resp.json())
    .then(product => dispatch(addProduct(product)));
}