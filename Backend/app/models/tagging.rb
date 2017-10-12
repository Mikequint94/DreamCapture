class Tagging < ApplicationRecord
  validates :dream_id, :keyword_id, presence: true
  validates :keyword_id, uniqueness: { scope: :dream_id}

  #  ----- Associations -------

  belongs_to :dream

  belongs_to :keyword

  # ----- Methods -------



end
