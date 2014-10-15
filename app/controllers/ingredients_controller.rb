class IngredientsController < ApplicationController
	def create
		@ingredient = Ingredient.new(params[:ingredient])
		if @ingredient.save

		else
		end
	end

  def update
    @ingredient = Ingredient.find(params[:id])
    if @ingredient.update_attributes(params[:ingredient])
    else
    end
  end

	def destroy
		@ingredient = Ingredient.find(params[:id])
		if @ingredient.destroy
		else
		end
	end
end
