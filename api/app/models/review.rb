class Review < ApplicationRecord
    belongs_to :user
    belongs_to :product

    validates :rating, numericality: true
end
