class CartProductsController < ApplicationController
    def create
        cart_product = CartProduct.create(cart_products_params)
        if cart_product.valid?
            render json: cart_product, include: [:product]
        else
            render json: {message: cart_product.errors.messages, status: 401}
        end
    end

    def destroy
        cart_product = CartProduct.find(params['id'])
        cart_product.destroy
        render json: {message: 'Success', status: 200}
    end

    private
    def cart_products_params
        params.require(:cart_products).permit(:cart_id, :product_id)
    end
end
