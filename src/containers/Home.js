import React, { Component } from 'react';
import Gallery from '../components/Gallery/Gallery';
import { BASE_URL } from '../App';
import { CLOUD_NAME } from '../App';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/images/hero-4.jpg';
import { addProductAsync } from '../redux/user';
import { connect } from 'react-redux';
import { paddPrice, getDiscountPrice } from './Product';

class Home extends Component {
    state={products:[]}

    componentDidMount() {
        this.getTopProducts();
    }

    getTopProducts() {
        if (sessionStorage.getItem('popularProducts') === null) {
            fetch(BASE_URL+'/products/popular')
            .then(resp => resp.json())
            .then(data => {
                sessionStorage.setItem('popularProducts', JSON.stringify(data));
                this.setState({ products: data.slice(0, 6) });
            });
        } else {
            const products = JSON.parse(sessionStorage.getItem('popularProducts')).slice(0, 6);
            this.setState({ products: products });
        }
    }
    setProducts() {
        return this.state.products.map((product, index) => {
            return (
                <div key={index} className="product-box">
                    <Link to=""><Image cloudName={CLOUD_NAME} publicId={product.image_urls[0]} /></Link>
                    <div className="details">
                        <h3>{product.title.slice(0, 45)}..</h3>
                        <p className="current-price">${ getDiscountPrice(product) }</p>
                        { product.discount !== 0 && <p className="previous-price">${paddPrice(product.price)}</p>}
                        <button onClick = {() => this.addProductToCart(product)}>Add Cart</button>
                    </div>
                </div>
            )
        })
    }

    addProductToCart(product) {
        if (this.props.token) {
            this.props.addProductAsync(this.props.token, product.id, this.props.user.cart.id)
        } else {
            console.log("Add the product to the cart only on the local side, maybe a custom action");
        }
    }

    render() {
        return (
            <div className="wrapper home-wrapper">
                <Gallery />
                <div className="container top-products">
                   <h2>Customer Favorites</h2>
                   <div className="products-preview">
                       {this.setProducts()}
                   </div>
                </div>

                <div className="container shipping-details">
                    <h2>What your pets need, when they need it.</h2>
                    <div className="shipping-box">
                        <div className="shipping-signin">
                            <p>Sign In for a better experience</p>
                            <Link to ="/register">Sign Up</Link>
                        </div>
                        <div>
                            <i className="icon truck"></i>
                            <p>Same-day Curbside Pickup</p>
                            <small>10% Off your online order</small>
                        </div>
                        <div>
                            <i className="icon clock"></i>
                            <p>30% Off Repeat Delivery</p>
                            <small>On your first order.</small>
                        </div>
                    </div>
                </div>

                <div className="warm-message">
                    <img alt="doggy" src = {heroImage} />
                    <div>
                        <h2>Getting a new puppy?</h2>
                        <p>
                            Find everything you need to welcome them home
                            here at greenpaws
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
const mstp = state => {
    return {
        token: state.users.token,
        user: state.users.user
    }
}
export default connect(mstp, { addProductAsync })(Home);