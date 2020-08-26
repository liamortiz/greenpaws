class Brand < ApplicationRecord
    has_many :products

    validates :name, presence: true
    validates :name, length: { minimum: 2 }
end
