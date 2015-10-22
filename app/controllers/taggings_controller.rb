class TaggingsController < ApplicationController

  before_filter :authenticate_user!, only: [:create, :destroy]
  def create
		@tagging = Tagging.new(params[:tagging])
    debugger
		if @tagging.save
      render :showRABL
		else
      render 401
		end
  end

  def destroy

  end

  def article_taggings
    @taggings = Tagging.where("type_class = ?", "Article")
    if @taggings
      render :indexRABL
    else
      render 401
    end
  end

  def recipe_taggings
    @taggings = Tagging.where("type_class = ?", "Recipe")
    if @taggings
      render :indexRABL
    else
      render 401
    end
  end

end
