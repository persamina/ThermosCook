class Tagging < ActiveRecord::Base
  attr_accessible :name, :type_class
	validates :name, presence: true
  validates :name, :uniqueness => true
  has_many :tags, :dependent => :destroy, :inverse_of => :tagging
  has_many :recipes, through: :tags, source: :tagable, source_type: :Recipe
  has_many :articles, through: :tags, source: :tagable, source_type: :Article
end
