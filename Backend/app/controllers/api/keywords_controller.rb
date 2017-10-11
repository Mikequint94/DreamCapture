class Api::KeywordsController < ApplicationController
  def create
    @keyword = Keyword.new(keyword_params)
    if @keyword.save
      render "api/keywords/index"
    else
      render @keyword.errors.full_messages, status: 422
    end
  end

  def update
    @keyword = Keyword.find(params[:id])
    if @keyword

      if @keyword.update_attributes(keyword_params)
        render "api/keywords/index"
      else
        render @keyword.errors.full_messages, status: 422
      end

    else
      render json: ["Keyword not found."], status: 404
    end
  end

  def destroy
    @keyword = Keyword.find(params[:id])
    if @keyword
      @keyword.destroy
    else
      render json: ["Keyword not found."], status: 404
    end
  end

  def index
    dream = Dream.find(params[:dream_id])
    @keyword = dream.keywords
    render 'api/keywords/index'
  end

  private

  def keyword_params
    params.require(:keyword).permit(:keyword)
  end

end
