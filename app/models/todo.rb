class Todo < ApplicationRecord
  belongs_to :user
  has_many :reactions
  has_many :comments
end
