class ProductsController < ApplicationController

    def create
        product = Product.create(product_params)
        puts product.price
        if product.valid?
            render json: product
        else
            render json: product.errors.messages
        end
    end

    def show
        render json: Product.find(params['id'])
    end

    def product_params
        params.require(:product).permit(:title, :price, :sku, :description, :discount, :brand_id,:category_id, :image_urls => [])
    end

end
