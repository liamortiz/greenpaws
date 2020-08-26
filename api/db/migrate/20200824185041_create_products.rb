class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :title
      t.decimal :price, precision: 5, scale: 2
      t.string :sku
      t.text :description
      t.integer :discount, default: 0
      t.string :image_urls, array: true, default: []
      t.integer :brand_id, null:false
      t.integer :category_id, null:false
      t.timestamps
    end
  end
end