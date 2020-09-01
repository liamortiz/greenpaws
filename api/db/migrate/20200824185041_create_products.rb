class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :title
      t.string :price
      t.string :sku
      t.text :description
      t.integer :discount, default: 0
      t.integer :average_rating, default: 0
      t.string :image_urls, array: true, default: []
      t.string :brand, null:false
      t.string :category, null:false
      t.timestamps
    end
  end
end