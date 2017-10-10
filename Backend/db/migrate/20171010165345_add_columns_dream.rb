class AddColumnsDream < ActiveRecord::Migration[5.1]
  def change
    add_column :dreams, :sentiment, :string
    add_column :dreams, :score, :integer
  end
end
