class Product < ApplicationRecord
    has_many :reviews
    has_many :cart_products
end
