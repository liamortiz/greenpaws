class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        @user = User.create(user_params)
        if @user.valid?
            @token = encode_token(user_id: @user.id)
            render json: {
                user: UserSerializer.new(@user),
                jwt: @token
            },
            status: :created
        else
            render json: {errors: @user.errors.messages, status: 401}
        end
    end
    def user_params
        params.require(:user).permit(:name, :email, :password)
    end
end
