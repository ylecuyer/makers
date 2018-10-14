class Todo < ApplicationRecord
  acts_as_taggable

  belongs_to :user
  has_many :reactions
  has_many :comments
end
