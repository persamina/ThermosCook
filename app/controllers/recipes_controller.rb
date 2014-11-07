class RecipesController < ApplicationController
  before_filter :authenticate_user!, :except => [:index]

	def index
		@recipes = Recipe.includes(:instructions).includes(:ingredients).includes(:recipe_photos).includes(:likes)
    @articles = Article.includes(:article_photos).includes(:likes)  
    if current_user
      @user = User.find(current_user.id, :include => [{:recipes => [:instructions, 
        :ingredients, 
        :recipe_photos]}, 
        :user_photos, :likes])
    end

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
      debugger
      puts @recipe.errors.full_messages
      return render :error, :status => :not_acceptable
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
      render 401
		end
	end
end
