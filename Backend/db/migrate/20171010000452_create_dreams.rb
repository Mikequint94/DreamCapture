class CreateDreams < ActiveRecord::Migration[5.1]
  def change
    create_table :dreams do |t|
      t.text :body, null: false
      t.integer :user_id, null: false, foreign_key: true
      t.timestamps
    end
  end
end
