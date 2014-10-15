class UserPhoto < ActiveRecord::Base
  attr_accessible :photo, :user_id
  has_attached_file :photo, 
    :styles => {:small => "64x64#" }, 
    :default_url => "portrait_blank.jpg"
	belongs_to :user, :inverse_of => :user_photos
end
