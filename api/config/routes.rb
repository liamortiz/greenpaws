Rails.application.routes.draw do
  resources :categories
  resources :brands
  resources :users, only: [:create, :update, :destroy]
  resources :orders
  resources :cart_products
  resources :carts
  resources :reviews
  resources :auth, only: [:create]
  
  get '/products/category/:category', to: 'products#filter_category'
  get '/products/brands/:brand', to: 'products#filter_brand'
  get '/products/popular', to: 'products#popular_products'
  resources :products
end
