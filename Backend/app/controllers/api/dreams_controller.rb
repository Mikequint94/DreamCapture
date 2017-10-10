class Api::DreamsController < ApplicationController

  def create
    @dream.new(dream_params)
    if @dream.create
      render "api/dreams/show"
    else
      render @dream.errors.full_messages, status: 422
    end
  end

  def show
    @dream.find(params[:id])
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
      @dreams = current_user.dreams.order(created_at: :desc)
      render 'api/dreams/index'
  end

  private

  def dream_params
    params.require(:dream).permit(:body)
  end

end
