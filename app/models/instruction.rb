class Instruction < ActiveRecord::Base
  attr_accessible :order, :description, :recipe_id
	belongs_to :recipe
	validates :recipe, :description, presence: true
end
