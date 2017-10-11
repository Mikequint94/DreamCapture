class Keyword < ApplicationRecord
  validates :keyword, presence: true, uniqueness: true

  #  ----- Associations -------

  has_many :taggings, dependent: :destroy

  # ----- Methods -------

end
