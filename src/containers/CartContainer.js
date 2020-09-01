import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import { CLOUD_NAME } from '../App';
import { removeProductAsync } from '../redux/user';

class CartContainer extends Component {
    state = {
        total: 0,
        shippingTotal: 0
    }
    componentDidMount() {
        this.getTotal();
    }
    
    getProducts() {
        return this.props.products.map((product, index) => 
            <div key = {index} className="product-box">
                <Image cloudName={CLOUD_NAME} publicId={`${product.image_urls[0]}`} />

                <div className="pricing">
                    <h2 className="title">{product.title}</h2>
                    <p className="current-price">${ this.getDiscountPrice(product) }</p>
                    { product.discount !== 0 && <p className="previous-price">${this.paddPrice(product.price)}</p>}
                </div>

                <div className="quantity">
                    <button className="icon minus"></button>
                    <span>1</span>
                    <button className="icon plus"></button>
                </div>
                <button onClick = {() => this.props.removeProductAsync(this.props.token, product.cartProductId)} className="icon remove"></button>
            </div>
            )
    }
    paddPrice(price) {
        price = parseFloat(price).toString();
        const decimalIndex = price.indexOf('.') + 1;

        if (decimalIndex === 0) return price;

        const leadingNumbers = price.substr(decimalIndex, price.length);
        return leadingNumbers.length < 2 ? price + '0' : price;
    }
    getDiscountPrice(product) {
        return this.paddPrice((product.price - ((product.price / 100) * product.discount)).toString());
    }
    getTotal() {
        let total = 0;
        let shippingTotal = 0;
        this.props.products.forEach(product => {
            const price = parseFloat(this.getDiscountPrice(product));
            total += price
            shippingTotal += Math.floor(((price / 100) * 2));
        })
        this.setState({
            total: this.paddPrice(total),
            shippingTotal: shippingTotal
        })
    }
    render() {
        return (
            <div className="wrapper cart-wrapper">
                <div className="product-container">
                {this.getProducts()}
                </div>
                <div className="checkout">
                    <div className="order">
                        <h2>Order Summary</h2>
                        <p>Subtotal (<span>{this.props.products.length} items</span>): <span>${this.state.total}</span></p>
                        <p>Estimated Shipping: <span>${this.state.shippingTotal}</span></p>
                        <p>Total Before Tax: <span>${this.paddPrice(parseFloat(this.state.total) + parseFloat(this.state.shippingTotal))}</span></p>
                        <button className="btn btn-checkout">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mstp = state => {
    return {
        token: state.users.token,
        products: state.users.user.productsInCart
    }
}
export default connect(mstp, { removeProductAsync })(CartContainer);