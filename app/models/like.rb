class Like < ActiveRecord::Base
  attr_accessible :count
  belongs_to :likeable, polymorphic: true
  belongs_to :user
end
