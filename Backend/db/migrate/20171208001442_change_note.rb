class ChangeNote < ActiveRecord::Migration[5.1]
  def change
    change_column :notes, :body, :text, :null => true
  end
end
