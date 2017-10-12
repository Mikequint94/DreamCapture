class Dream < ApplicationRecord
  validates :body, :user_id, presence: true

  #  ----- Associations -------

  belongs_to :user

  has_one :note, dependent: :destroy

  has_many :taggings, dependent: :destroy

  has_many :keywords, through: :taggings

  # ----- Methods -------

end
