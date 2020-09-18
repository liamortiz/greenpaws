import React, { Component } from 'react';
import { BASE_URL } from '../../App';
import { CLOUD_NAME } from '../../App';
import { Image } from 'cloudinary-react';
import { paddPrice, getDiscountPrice } from '../Product';
import { Link } from 'react-router-dom';

class CartProductPreviews extends Component {
    state = {
        products: []
    }
    componentDidMount() {
        this.setProducts();
    }

    setProducts() {
        fetch(BASE_URL + '/products/category/clothes')
        .then(resp => resp.json())
        .then(products => {
            this.setState({
                products: products.slice(0, 10)
            })
        })
    }
    getReviews(product) {
        const reviews = []
        for (let i = 0; i < 5; i++) {
            const name = (product.average_rating > i) ? "star star-full" : "star";
            reviews.push(
                <span key={i} className={name}></span>
            )
        }
        return reviews;
    }
    getProducts() {
        return this.state.products.map((product, index) => 
            <div key = {index} className="product-box-preview">
                
                <Link to={`/products/${product.id}`}><Image cloudName={CLOUD_NAME} publicId={`${product.image_urls[0]}`} /></Link>
                <div className="pricing">
                    <h2 className="title">{product.title}</h2>

                    <div className="checkout-reviews">
                        {this.getReviews(product)}
                    </div>

                    <div className="price">
                        <p className="current-price">${ getDiscountPrice(product) }</p>
                        { product.discount !== 0 && <p className="previous-price">${paddPrice(product.price)}</p>} 
                    </div>

                    <button className="btn" onClick={() => this.props.addProduct(product)} >Add Cart</button>
                </div>
            </div>
            )
    }

    render() {
        return (
            <div className="cart-product-previews">
                <h2>Other Popular Items</h2>
                <div className="container product-preview-container">
                    {this.getProducts()}
                </div>
            </div>
        )
    }
}
export default CartProductPreviews;