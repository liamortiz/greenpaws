import React from 'react';
import { Link } from 'react-router-dom';
import { CLOUD_NAME } from '../../App';
import { Image } from 'cloudinary-react';
import { paddPrice, getDiscountPrice } from '../../containers/Product';

const ProductCard = ({ product }) => {

    function getReviews(product) {
        const reviews = []
        for (let i = 0; i < 5; i++) {
            const name = (product.average_rating > i) ? "star star-full" : "star";
            reviews.push(
                <span key={i} className={name}></span>
            )
        }
        return reviews;
    }
    return (
        <div className="product-card">
            <div className="reviews">
                {getReviews(product)}
                <span className="review-count">{product.review_count} Reviews</span>
            </div>

            <Link to={`/products/${product.id}`}>
            <Image cloudName={CLOUD_NAME} publicId={`${product.image_urls[0]}`} />
            </Link>

            <div className="pricing">
                <h2 className="title">{product.title}</h2>

                <div className="price">
                    <p className="current-price">${ getDiscountPrice(product) }</p>
                    { product.discount !== 0 && 
                        <div>
                            <p className="previous-price">${paddPrice(product.price)}</p>
                            <span className="on-sale">{product.discount}% OFF</span>
                        </div>
                    } 
                </div>
            </div>
        </div>
    )
}
export default ProductCard;