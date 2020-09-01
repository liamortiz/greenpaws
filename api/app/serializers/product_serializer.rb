class ProductSerializer < ActiveModel::Serializer
    attributes :id, :title, :average_rating, :discount, :sku
    attributes :image_urls, :price, :description, :category, :brand
    attributes :review_count
end