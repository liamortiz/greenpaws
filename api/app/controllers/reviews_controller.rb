class ReviewsController < ApplicationController
    def create
        review = Review.create(review_params)
        review.product.update_average_rating
        
        if review.valid?
            render json: review
        else
            render json: review.errors.messages
        end
    end

    def show
        render json: Review.find(params['id'])
    end

    def review_params
        params.require(:review).permit(:title, :content, :user_id, :product_id, :rating)
    end
end
