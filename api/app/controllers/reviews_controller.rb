class ReviewsController < ApplicationController
    skip_before_action :authorized, only: [:create]
    def create
        # This needs to change before production
        user_id = User.all.sample().id
        product_id = Product.all.sample().id
        review = Review.create(title: review_params['title'], content: review_params['content'], user_id: user_id, rating: review_params['rating'], product_id: product_id)
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

    private
    def review_params
        params.require(:review).permit(:title, :content, :product_id, :rating)
    end
end
