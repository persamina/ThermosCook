class RecipesController < ApplicationController
  before_filter :authenticate_user!, :except => [:index]

	def index
		@recipes = Recipe.includes(:instructions).includes(:ingredients).includes(:recipe_photos)
    @articles = Article.includes(:article_photos)
    @user = current_user
    puts "AUTHENTICITY TOKEN AUTHENTICITY TOKEN AUTHENTICITY TOKEN AUTHENTICITY TOKEN AUTHENTICITY TOKEN "
    puts form_authenticity_token
		respond_to do |format|
			format.json { render :indexRABL }
			format.html { render :index }
		end
	end

	def create
		@recipe = Recipe.new(params[:recipe])
    @recipe.user_id = current_user.id
		if @recipe.save
		  respond_to do |format|
			  format.json { render :showRABL }
		  end
		else

		end
	end
	def show
		@recipe = Recipe.find(params[:id])
		respond_to do |format|
			format.json { render :showRABL }
		end
	end

  def showJFU
		@recipe = Recipe.find(params[:recipe_id])
    respond_to do |format| 
      format.json { render :showJFU }
    end
  end

  def update
    @recipe = Recipe.find(params[:id])
    if @recipe.update_attributes(params[:recipe])
      render :showRABL
    else
      render 422
    end

  end
  
	def destroy
		@recipe = Recipe.find(params[:id])
		if @recipe && current_user.id == @recipe.user_id
			@recipe.destroy
			render :showRABL
		else
		end
	end
end
