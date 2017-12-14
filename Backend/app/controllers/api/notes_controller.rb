class Api::NotesController < ApplicationController
  def create

    @note = Note.find_by(dream_id: params[:note][:dream_id])
    if @note

      if @note.update_attributes(note_params)
        render "api/notes/index"
      else
        render json: @note.errors.full_messages, status: 422
      end

    else

      @note = Note.new(note_params)
      if @note.save
        render "api/notes/index"
      else
        render json: @note.errors.full_messages, status: 422
      end

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

  private

  def note_params
    params.require(:note).permit(:body, :dream_id)
  end

end
