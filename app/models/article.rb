class Article < ActiveRecord::Base
  attr_accessible :title, :body, :user_id, :published
	validates :title, presence: true

  has_many :article_photos, :dependent => :destroy, :inverse_of => :article
end
