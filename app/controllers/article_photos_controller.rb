class ArticlePhotosController < ApplicationController
  def show
    @article_photo = ArticlePhoto.find(params[:id])
    if @article_photo
      render :showRABL
    else
    end
    
  end

	def create
		@article_photo = ArticlePhoto.new(params[:recipe_photo])
		if @article_photo.save
      render :showRABL
		else
		end
	end

  def destroy
    @article_photo = ArticlePhoto.find(params[:id])
    if @article_photo
      @article_photo.destroy
      render :deleteRABL
    else

    end

  end
end
