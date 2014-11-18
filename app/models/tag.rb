class Tag < ActiveRecord::Base
  attr_accessible :user_id, :tagable_id, :tagable_type, :tagging_id
  belongs_to :tagable, polymorphic: true
  belongs_to :tagging, :inverse_of => :tags
  belongs_to :user
end
