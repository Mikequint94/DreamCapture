class Note < ApplicationRecord
  validates :body, :dream_id, presence: true
  validates :dream_id, uniqueness: true

  #  ----- Associations -------

  belongs_to :dream


  # ----- Methods -------


end
