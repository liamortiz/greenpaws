class ApplicationController < ActionController::API

    before_action :authorized

    def encode_token(payload)
        JWT.encode(payload, 'HIDE_THIS_BEFORE_PRODUCTION')
    end

    def decoded_token
        header = auth_header
        if header
            token = header.split(' ')[1]
            begin
                JWT.decode(token, 'HIDE_THIS_BEFORE_PRODUCTION')
            rescue JWT::DecodeError
                nil
            end
        end
    end

    def auth_header
        request.headers['Authorization']
    end

    def current_user
        if decoded_token
            user_id = decoded_token[0]['user_id']
            @user = User.find_by(id: user_id)
        end
    end

    def logged_in?
        !!current_user
    end

    def authorized
        render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
    end

end