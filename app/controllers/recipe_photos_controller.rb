class RecipePhotosController < ApplicationController
  before_filter :authenticate_user!, :except => [:show]
  def show
    @recipe_photo = RecipePhoto.find(params[:id])
    if @recipe_photo
      render :showRABL
    else
    end
    
  end

	def create
		@recipe_photo = RecipePhoto.new(params[:recipe_photo])
		if @recipe_photo.save
      render :showRABL
		else
		end
	end

  def destroy
    @recipe_photo = RecipePhoto.find(params[:id])
    if @recipe_photo
      @recipe_photo.destroy
      render :deleteRABL
    else

    end

  end
end
