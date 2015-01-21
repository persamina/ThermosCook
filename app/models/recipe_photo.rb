class RecipePhoto < ActiveRecord::Base
  attr_accessible :description, :photo, :recipe_id, :ratio
	has_attached_file :photo, :styles => {
		thumb: "300x",
		original: "750x750"
	}
  after_post_process :save_image_ratio
	belongs_to :recipe, :inverse_of => :recipe_photos

  def save_image_ratio
    geo = Paperclip::Geometry.from_file(photo.queued_for_write[:original])
    self.ratio = geo.height.to_f / geo.width
  end
end
