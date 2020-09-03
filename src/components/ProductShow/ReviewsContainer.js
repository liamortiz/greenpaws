import React, { Component } from 'react';
class ReviewsContainer extends Component {
    getReviews() {
        if (this.props.reviews) {
            return this.props.reviews.map((review, index) => 
                    <div key={index} className="review-box">
                        {this.getNumberOfStars(review)}
                        <h3>{review.title}</h3>
                        <p className="poster-name">{review.user_name}:</p>
                        <p>{review.content}</p>
                    </div>
                )
        }
    }
    getNumberOfStars(review) {
        const stars = []
        for (let i = 0; i < 5; i++) {
            const name = (review.rating > i) ? "star star-full" : "star";
            stars.push(
                <span key={i} className={name}></span>
            )
        }
        return stars;
    }
    render() {
        return (
            <div className="wrapper reviews-wrapper">
                <h2>Product Reviews</h2>
                {this.getReviews()}
            </div>
        )
    }
}
export default ReviewsContainer;