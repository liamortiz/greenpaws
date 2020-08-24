Rails.application.routes.draw do
  resources :users
  resources :orders
  resources :cart_products
  resources :carts
  resources :reviews
  resources :products
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
