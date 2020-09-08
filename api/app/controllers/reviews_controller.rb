class ReviewsController < ApplicationController
    def show
        render json: Review.find(params['id'])
    end

    private
    def review_params
        params.require(:review).permit(:title, :content, :product_id, :rating)
    end
end
