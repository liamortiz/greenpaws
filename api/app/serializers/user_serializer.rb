class UserSerializer < ActiveModel::Serializer
    attributes :id, :name, :email
    attributes :cart
    attributes :products_in_cart
  end