class ArticlesController < ApplicationController
	def index
		@articles = Article.includes(:article_photos)
		respond_to do |format|
			format.json { render :indexRABL }
			format.html { render :index }
		end
	end
	def create
		@article = Article.new(params[:article])
		if @article.save
		  respond_to do |format|
			  format.json { render :showRABL }
		  end
		else

		end
	end
	def show
		@article = Article.find(params[:id])
		respond_to do |format|
			format.json { render :showRABL }
		end

	end

  def showJFU
		@article = Article.find(params[:article_id])
    respond_to do |format| 
      format.json { render :showJFU }
    end
  end
  
	def destroy
		@article = Article.find(params[:id])
		if @article
			@article .destroy
			render :showRABL
		else
		end
	end
end
