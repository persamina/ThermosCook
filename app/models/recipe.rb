class Recipe < ActiveRecord::Base
  attr_accessible :name, 
									:description, 
									:ingredients_attributes, 
									:instructions_attributes, 
									:recipe_photos_attributes
	validates :name, :description, presence: true

	has_many :recipe_photos, :dependent => :destroy, :inverse_of => :recipe
	has_many :ingredients, :dependent => :destroy, :inverse_of => :recipe
	has_many :instructions, :dependent => :destroy, :inverse_of => :recipe

	accepts_nested_attributes_for :recipe_photos
	accepts_nested_attributes_for :ingredients, :reject_if => lambda { |ingredient| ingredient[:name].blank?}
	accepts_nested_attributes_for :instructions, :reject_if => lambda { |instructions| instructions[:description].blank?}
end
