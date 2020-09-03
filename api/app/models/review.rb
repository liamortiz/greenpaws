class Review < ApplicationRecord
    belongs_to :user
    belongs_to :product

    validates :rating, numericality: true


    def user_name
        self.user.name
    end
end
