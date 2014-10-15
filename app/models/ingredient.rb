class Ingredient < ActiveRecord::Base
  attr_accessible :name, :amount, :unit, :recipe_id
	belongs_to :recipe
	validates :recipe, :name, presence: true
  #before_create :change_fraction_to_float

  #def change_fraction_to_float
  #  self.amount = Rational(self.amount).to_f.to_s
  #end

end
