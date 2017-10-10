class Note < ApplicationRecord
  validates :body, :dream_id, presence: true

  #  ----- Associations -------

  belongs_to :dream

  has_one :user,
          through: :dream,
          source: :user

  # ----- Methods -------


end
