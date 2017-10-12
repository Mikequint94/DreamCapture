class Keyword < ApplicationRecord
  validates :keyword, presence: true, uniqueness: true

  #  ----- Associations -------

  has_many :taggings, dependent: :destroy

  has_many :dreams, through: :taggings

  has_many :users, through: :dreams

  # ----- Methods -------

end
