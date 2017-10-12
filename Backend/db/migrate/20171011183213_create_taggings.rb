class CreateTaggings < ActiveRecord::Migration[5.1]
  def change
    create_table :taggings do |t|
      t.integer :keyword_id, null: false, foreign_key: true
      t.integer :dream_id, null: false, foreign_key: true
      t.timestamps
    end
    add_index :taggings, :dream_id
    add_index :taggings, :keyword_id
    add_index :taggings, [:dream_id, :keyword_id], unique: true
  end
end
