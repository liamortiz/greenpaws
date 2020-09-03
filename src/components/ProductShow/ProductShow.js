import React, { Component } from 'react';
import { BASE_URL } from '../../App';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import { CLOUD_NAME } from '../../App';
import { paddPrice, getDiscountPrice } from '../../containers/Product';
import { Link } from 'react-router-dom';
import { addProductAsync } from '../../redux/user';
import ReviewsContainer from './ReviewsContainer';

class ProductShow extends Component {
    state = {
        currentProduct: {image_urls: [], reviews: [], displayImage: null}
    }
    componentDidMount() {
        this.productId = this.props.match.params.id;
        this.getProduct(this.productId);
        this.getReviews(this.productId);
    }

    getProduct(id) {
        fetch(BASE_URL + `/products/${id}`)
            .then(resp => resp.json())
            .then(product => this.setState({
                currentProduct: product,
                displayImage: product.image_urls[0]
            }))
    }
    getReviews(id) {
        fetch(BASE_URL + `/products/${id}/reviews`)
            .then(resp => resp.json())
            .then(reviews => this.setState({ reviews }))
    }

    getAverageRating(product) {
        const reviews = []
        for (let i = 0; i < 5; i++) {
            const name = (product.average_rating > i) ? "star star-full" : "star";
            reviews.push(
                <span key={i} className={name}></span>
            )
        }
        return reviews;
    }

    getSliderImages(imageUrls) {
        return imageUrls.map((url, index) => 
            <Image onClick = {() => this.updateDisplayImage(index)} key={index} className="slider-image" cloudName={CLOUD_NAME} publicId={`${url}`}/>
            )
    }

    updateDisplayImage = (imageIndex) => {
        this.setState({
            displayImage: this.state.currentProduct.image_urls[imageIndex]
        })
    }

    addProduct = () => {
        if (this.props.user) {
            this.props.addProductAsync(this.props.token, this.state.currentProduct.id, this.props.user.cart.id);
        }
    }

    render() {
        const { discount, price, title, description, image_urls, review_count, brand} = this.state.currentProduct;
        return (
            <>
            <div className="wrapper product-show-wrapper">
                <div className="image-controls">
                    {image_urls[0] && <Image cloudName={CLOUD_NAME} publicId={`${this.state.displayImage}`}/>}
                    {image_urls.length > 1 &&
                        <div className="slider">
                            {this.getSliderImages(image_urls)}
                        </div>
                    }
                </div>
                <div className="product-details">
                    <h2>{ title }</h2>
                    <div className="reviews-detail">
                        <Link to="">by {brand}</Link>
                        {this.getAverageRating(this.state.currentProduct)}
                        <span className="review-count">({review_count}) Reviews</span>
                    </div>

                    <div className="pricing-details">
                        <div className="price">
                            <p className="actual-price">Price: <span>${getDiscountPrice(this.state.currentProduct)}</span></p>
                            {discount !== 0 && <p>Listing: <span className="listing">${paddPrice(price)}</span></p> }
                        </div>
                        <button onClick = {this.addProduct} className="btn cart-btn">Add to Cart</button>
                    </div>

                    <div className="description-container">
                        <h3>Description</h3>
                        <p>{ description }</p>
                    </div>
                </div>
            </div>
            <ReviewsContainer reviews={this.state.reviews}/>
            </>
        )
    }
}
const mstp = state => {
    return {
        token: state.users.token,
        user: state.users.user
    }
}
export default connect(mstp, { addProductAsync })(ProductShow);