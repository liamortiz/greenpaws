class CategoriesController < ApplicationController
    def create
        category = Category.create(category_params)
        if category.valid?
            render json: category
        else
            render json: category.errors.messages
        end
    end

    private
    def category_params
        params.require(:category).permit(:name)
    end
end
