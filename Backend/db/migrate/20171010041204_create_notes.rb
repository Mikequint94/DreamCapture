class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.text :body, null: false
      t.integer :dream_id, null: false, foreign_key: true
      t.timestamps
    end
    add_index :notes, :dream_id, unique: true
  end
end
