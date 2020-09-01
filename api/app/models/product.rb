class Product < ApplicationRecord
    has_many :reviews
    has_many :cart_products
    has_many :orders
    
    validates :title, :description, :price, :sku,  presence: true
    validates :title, :description, length: { minimum: 2 }
    validates :average_rating, numericality: true
    validates :sku, uniqueness: true

    def review_count
        self.reviews.count
    end
    

    def update_average_rating
        average=0
        unless self.reviews.empty?
            total = self.reviews.sum(&:rating)
            average = (total / self.reviews.length).round
        end

        self.update(average_rating: average)
    end

end
