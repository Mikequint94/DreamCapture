class Dream < ApplicationRecord
  validates :body, :user_id, presence: true

  #  ----- Associations -------

  belongs_to :user

  # ----- Methods -------

end
