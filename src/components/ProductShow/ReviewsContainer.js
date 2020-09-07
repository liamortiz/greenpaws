import React, { Component } from 'react';
class ReviewsContainer extends Component {
    state = {
        reviews: [],
        currentPage: 1,
        maxResults: 5
    }
    componentDidUpdate(prevProps) {
        if (prevProps.reviews !== this.props.reviews) {
            this.setReviews()
        }
    }
    setReviews() {
        const reviews = this.props.reviews.map((review, index) => 
                <div key={index} className="review-box">
                    {this.getNumberOfStars(review)}
                    <h3>{review.title}</h3>
                    <p className="poster-name">{review.user_name}:</p>
                    <p>{review.content}</p>
                </div>
            )
        this.setState({ reviews })
    }
    updateCurrentReviews() {
        const min = this.state.currentPage * this.state.maxResults;
        const max = min + this.state.maxResults;
        const currentReviews = this.state.allReviews.slice(min, max);
        this.setState({
            reviews: currentReviews
        })
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
    getCurrentReviews() {
        const min = this.state.maxResults * (this.state.currentPage-1);
        const max = min + this.state.maxResults;
        return this.state.reviews.slice(min, max);
    }
    updateCurrentPage = (nextPageNumber) => {
        if (nextPageNumber <= 0 || nextPageNumber > Math.floor(this.state.reviews.length / this.state.maxResults) + 1 || nextPageNumber === this.state.currentPage) return;
        this.setState({
            currentPage: nextPageNumber
        })
    }
    getPageNumbers() {
        const pages = [];
        const min = 0;
        const max = Math.floor(this.state.reviews.length / this.state.maxResults) + ((this.state.reviews.length % this.state.maxResults !== 0) ? 1 : 0);
        for (let i = min; i < max; i++) {
            pages.push(<button key={i} onClick={() => this.updateCurrentPage(i+1)} className={(i+1===this.state.currentPage) ? "active-page" : ""}>{i+1}</button>)
        }
        return pages;
    }
    render() {
        return (
            <div className="wrapper reviews-wrapper">
                <h2>Product Reviews</h2>
                {this.getCurrentReviews()}
                {this.state.reviews.length > 0 && this.getPageNumbers()}
            </div>
        )
    }
}
export default ReviewsContainer;