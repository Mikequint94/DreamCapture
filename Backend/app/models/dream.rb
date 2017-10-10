class Dream < ApplicationRecord
  validates :body, :user_id, presence: true

  #  ----- Associations -------

  belongs_to :user

  has_one :note, dependent: :destroy

  # ----- Methods -------

end
