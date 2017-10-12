class Api::KeywordsController < ApplicationController
  def create
    @keyword = Keyword.find_by(keyword: params[:keyword][:keyword].downcase)

    if @keyword
      @keyword.dream_ids = @keyword.dream_ids << params[:keyword][:dream_id]
      render "api/keywords/show"

    else
      @keyword = Keyword.new({ keyword: params[:keyword][:keyword].downcase } )
      if @keyword.save
        @keyword.dream_ids = params[:keyword][:dream_id]
        render "api/keywords/show"
      else
        render json: @keyword.errors.full_messages, status: 422
      end

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
    user = User.find(params[:user_id])
    @keywords = user
                  .keywords
                  .joins(:taggings)
                  .group("keywords.id")
                  .order("count(taggings.id) DESC")
                  .limit(5)
    render 'api/keywords/index'
  end

  private

  def keyword_params
    params.require(:keyword).permit(:keyword, :dream_id)
  end

end
