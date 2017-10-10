class Api::DreamsController < ApplicationController

  def create
    @dream = Dream.new(dream_params)
    if @dream.save!
      render "api/dreams/show"
    else
      render @dream.errors.full_messages, status: 422
    end
  end

  def show
    @dream = Dream.find(params[:id])
    if @dream
      render "api/dreams/show"
    else
      render json: ["Dream not found."], status: 404
    end
  end

  def update
    @dream = Dream.find(params[:id])
    if @dream

      if @dream.update_attributes(dream_params)
        render "api/dreams/show"
      else
        render @dream.errors.full_messages, status: 422
      end

    else
      render json: ["Dream not found."], status: 404
    end
  end

  def destroy
    @dream = Dream.find(params[:id])
    if @dream
      @dream.destroy
    else
      render json: ["Dream not found."], status: 404
    end
  end

  def index
    user = User.find(params[:user_id])
    @dreams = user.dreams.order(created_at: :desc)
    render 'api/dreams/index'
  end

  private

  def dream_params
    params.require(:dream).permit(:body, :user_id)
  end

end
