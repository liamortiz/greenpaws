class Product < ApplicationRecord
    has_many :reviews
    has_many :cart_products
    has_many :orders

    belongs_to :brand
    belongs_to :category

    validates :title, :description, :price, :sku,  presence: true
    validates :title, :description, length: { minimum: 2 }
    validates :price, numericality: true
    validates :sku, uniqueness: true
end
