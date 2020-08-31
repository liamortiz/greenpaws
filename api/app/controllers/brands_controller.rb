class BrandsController < ApplicationController
    def show
        brand = Brand.find(params['id'])
        render json: brand.products, :except => [:created_at, :updated_at, :brand_id]
    end

    def create
        brand = Brand.create(brand_params)
        if brand.valid?
            render json: brand
        else
            render json: brand.errors.messages
        end
    end

    private
    def brand_params
        params.require(:brand).permit(:name)
    end
end
