Rails.application.routes.draw do
  resources :categories
  resources :brands
  resources :users
  resources :orders
  resources :cart_products
  resources :carts
  resources :reviews
  
  get '/products/category/:category', to: 'products#filter_category'
  get '/products/brands/:brand', to: 'products#filter_brand'
  resources :products
end
