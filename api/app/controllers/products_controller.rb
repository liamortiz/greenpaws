class ProductsController < ApplicationController
    skip_before_action :authorized, only: [:create, :get_reviews, :filter_brand, :filter_category, :show, :popular_products, :get_brands]
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
        products = Product.select{|product| product.category == params["category"]}
        if products
            render json: products
        else
            render json: {message: "Category not found", status: '404'}
        end
    end

    def filter_brand
        products = Product.select{|product| product.brand == params["brand"]}
        if products
            render json: products
        else
            render json: {message: "Brand not found", status: '404'}
        end
    end

    def popular_products
        products = Product.select{|product| product.average_rating >= 5}
        if products.size <= 0
            products = Product.select{|product| product.category == 'toys'}
        end
        render json: products
    end

    def get_reviews
        product = Product.find(params['id'])
        if product
            render json: product.reviews
        else
            render json: {message: 'Product not found!', status: 404}
        end
    end

    def get_brands
        brands = Product.all.map{|product| product.brand}
        brands = brands.map{|brand| {name: brand, count: brands.count(brand) }}
        render json: {brands: brands.uniq}
    end

    private
    def product_params
        params.require(:product).permit(:title, :price, :sku, :description, :discount, :category, :brand, :image_urls => [])
    end

end