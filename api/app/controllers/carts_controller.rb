class CartsController < ApplicationController
    skip_before_action :authorized, only: [:create]
end
