Rails.application.routes.draw do
  resources :users
  resources :orders
  resources :cart_products
  resources :carts
  resources :reviews
  resources :auth, only: [:create]
  
  get '/products/category/:category', to: 'products#filter_category'
  get '/products/brands/:brand', to: 'products#filter_brand'
  get '/products/popular', to: 'products#popular_products'
  get '/products/:id/reviews', to: 'products#get_reviews'
  get '/products/onsale', to: 'products#onsale'
  get '/brands', to: 'products#get_brands'
  get '/products/categories/:q', to: 'products#get_multiple_categories'

  resources :products
end
