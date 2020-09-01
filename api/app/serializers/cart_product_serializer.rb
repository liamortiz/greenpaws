class CartProductSerializer < ActiveModel::Serializer
    attributes :id, :cart_id, :product
end