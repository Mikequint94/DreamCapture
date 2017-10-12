class Api::NotesController < ApplicationController
  def create
    @note = Note.new(note_params)
    if @note.save
      render "api/notes/index"
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def update
    @note = Note.find(params[:id])
    if @note

      if @note.update_attributes(note_params)
        render "api/notes/index"
      else
        render json: @note.errors.full_messages, status: 422
      end

    else
      render json: ["Note not found."], status: 404
    end
  end

  def destroy
    @note = Note.find(params[:id])
    if @note
      @note.destroy
    else
      render json: ["Note not found."], status: 404
    end
  end

  # def index
  #   dream = Dream.find(params[:dream_id])
  #   @note = dream.note
  #   render 'api/notes/index'
  # end

  private

  def note_params
    params.require(:note).permit(:body, :dream_id)
  end

end
