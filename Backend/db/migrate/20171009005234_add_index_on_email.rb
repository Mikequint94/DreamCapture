class AddIndexOnEmail < ActiveRecord::Migration[5.1]
  def change
    add_index :users, :email, unique: true
    change_column :users, :session_token, :string, null: false
  end
end
