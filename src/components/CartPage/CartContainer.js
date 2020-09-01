import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import { CLOUD_NAME } from '../../App';
import { removeProductAsync, addProductAsync } from '../../redux/user';
import { paddPrice, getDiscountPrice } from '../../containers/Product';
import CartProductPreviews from './CartProductPreviews';

class CartContainer extends Component {
    state = {
        total: 0,
        shippingTotal: 0
    }
    componentDidMount() {
        this.getTotal()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.products !== this.props.products) {
            this.getTotal();
        }
    }
    getProducts() {
        return this.props.products.map(({id, product}, index) => 
            <div key = {index} className="product-box">
                
                <Image cloudName={CLOUD_NAME} publicId={`${product.image_urls[0]}`} />
                <div className="pricing">
                    <h2 className="title">{product.title}</h2>
                    <p className="current-price">${ getDiscountPrice(product) }</p>
                    { product.discount !== 0 && <p className="previous-price">${paddPrice(product.price)}</p>}

                </div>
                <div className="quantity">
                    <button className="icon minus"></button>
                    <span>1</span>
                    <button className="icon plus"></button>
                </div>

                <button onClick = {() => this.props.removeProductAsync(this.props.token, id)} className="icon remove"></button>
            </div>
            )
    }
    getTotal() {
        let total = 0;
        let shippingTotal = 0;
        this.props.products.forEach(({product}) => {
            const price = parseFloat(getDiscountPrice(product));
            total += price
            shippingTotal += Math.floor(((price / 100) * 40));
        })
        if (total > 30) {
            shippingTotal = 0;
        }
        this.setState({
            total: paddPrice(total),
            shippingTotal: shippingTotal
        })
    }

    addProductToCart = (product) => {
        if (this.props.token) {
            this.props.addProductAsync(this.props.token, product.id, this.props.user.cart.id)
        } else {
            console.log("Add the product to the cart only on the local side, maybe a custom action");
        }
    }

    render() {
        return (
            <>
            <div className="wrapper cart-wrapper">
                <div className="product-container">
                {this.getProducts()}
                </div>
                <div className="checkout">
                    <div className="order">
                        <h2>Order Summary</h2>
                        <p>Subtotal (<span>{this.props.products.length} items</span>): <span>${this.state.total}</span></p>
                        <p>Estimated Shipping: <span>${this.state.shippingTotal}</span></p>
                        <p>Total Before Tax: <span>${paddPrice(parseFloat(this.state.total) + parseFloat(this.state.shippingTotal))}</span></p>
                        <button className="btn btn-checkout">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
            <CartProductPreviews addProduct={this.addProductToCart} />
            </>
        )
    }
}
const mstp = state => {
    return {
        token: state.users.token,
        user: state.users.user,
        products: state.users.user.productsInCart
    }
}
export default connect(mstp, { removeProductAsync, addProductAsync })(CartContainer);