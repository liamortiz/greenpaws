class ProductsController < ApplicationController
    skip_before_action :authorized, only: [:get_reviews, :filter_brand, :filter_category, 
    :show, :popular_products, :get_brands, :onsale, :get_multiple_categories, :index]

    def index
        product_name = params['name'].downcase
        products = Product.select{|product| product.title.downcase.include?(product_name)}
        if products.size > 0
            render json: products
        else
            render json: Product.all
        end
    end

    def show
        render json: Product.find(params['id']), include: [:reviews]
    end

    def onsale
        render json: Product.select{|product| product.discount != 0}
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
        if products.size < 6
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

    def get_multiple_categories
        categories = params['q'].split('&')
        products = []
        categories.each do |category|
            products += Product.select{|p| p.category == category}
        end
        render json: products
    end

    private
    def product_params
        params.require(:product).permit(:title, :price, :sku, :description, :discount, :category, :brand, :image_urls => [])
    end

end