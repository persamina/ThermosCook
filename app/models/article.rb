class Article < ActiveRecord::Base
  attr_accessible :title, :body, :user_id, :published
	validates :title, presence: true
  validates :title, :uniqueness => true

  has_many :article_photos, :dependent => :destroy, :inverse_of => :article
  has_many :likes, as: :likeable, :dependent => :destroy, :inverse_of => :likeable
end
