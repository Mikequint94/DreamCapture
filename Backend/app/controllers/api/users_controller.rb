class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user

      if @user.update_attributes(user_params)
        render "api/users/show"
      else
        render @user.errors.full_messages, status: 422
      end

    else
      render json: ["User not found."], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
