class UserSerializer < ActiveModel::Serializer
    attributes :id, :name
    attributes :cart

    has_many :cart_products, through: :cart
end