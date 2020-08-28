class ProductsController < ApplicationController

    def show
        render json: Product.find(params['id']), include: [:reviews]
    end

    def create
        product = Product.create(product_params)
        if product.valid?
            render json: product
        else
            render json: product.errors.messages
        end
    end

    def filter_category
        category = Category.find_by(name: params["category"])
        if category
            render json: category.products
        else
            render json: {message: "Category not found", status: '404'}
        end
    end

    def filter_brand
        brand = Brand.find_by(name: params["brand"])
        if brand
            render json: brand.products
        else
            render json: {message: "Brand not found", status: '404'}
        end
    end

    def product_params
        params.require(:product).permit(:title, :price, :sku, :description, :discount, :brand_id,:category_id, :image_urls => [])
    end

end