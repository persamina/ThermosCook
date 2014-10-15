class RecipePhoto < ActiveRecord::Base
  attr_accessible :description, :photo, :recipe_id
	has_attached_file :photo, :styles => {
		thumb: "200x200",
		original: "640x640"
	}
	belongs_to :recipe, :inverse_of => :recipe_photos
end
