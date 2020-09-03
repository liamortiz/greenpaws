class ReviewSerializer < ActiveModel::Serializer
    attributes :content, :title, :rating, :user_name
end