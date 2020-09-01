class User < ApplicationRecord
    has_many :orders
    has_many :reviews
    has_one :cart
    has_many :products, through: :orders
    has_many :cart_products, through: :cart

    validates :name, :email, :password, presence: true
    validates :email, uniqueness: true
    validates :password, length: {in: 4..25, message: "is too short or too long!"}

    has_secure_password
end
