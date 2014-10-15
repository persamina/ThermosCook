class ArticlePhoto < ActiveRecord::Base
  attr_accessible :description, :photo, :article_id
	has_attached_file :photo, :styles => {
		thumb: "100x100",
		original: "640x640"
	}
	belongs_to :article, :inverse_of => :article_photos
end
