class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]
    def show
        @user = User.find(params['id'])
        render json: @user, serializer: UserSerializer
    end
    def create
        user = User.create(user_params)
        cart = Cart.create(user_id: user.id)
        if user.valid?
            token = encode_token(user_id: user.id)
            render json: {
                user: UserSerializer.new(user),
                jwt: token
            },
            status: :created
        else
            render json: {errors: user.errors.messages, status: 401}
        end
    end

    private
    def user_params
        params.require(:user).permit(:name, :email, :password)
    end
end
