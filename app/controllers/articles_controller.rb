class ArticlesController < ApplicationController
  before_filter :authenticate_user!, :except => [:index]

	def index
		@articles = Article.includes(:article_photos)
		respond_to do |format|
			format.json { render :indexRABL }
			format.html { render :index }
		end
	end

	def create
		@article = Article.new(params[:article])
    @article.user_id = current_user.id
		if @article.save
		  respond_to do |format|
			  format.json { render :showRABL }
		  end
		else
      return render :errorRABL, :status => :not_acceptable
		end
	end
  
	def show
		@article = Article.find(params[:id])
		respond_to do |format|
			format.html { render :show }
			format.json { render :showRABL }
		end

	end

  def showJFU
		@article = Article.find(params[:article_id])
    respond_to do |format| 
      format.json { render :showJFU }
    end
  end
 
  def update
    @article = Article.find(params[:id], :include => :article_photos)
    @article.body = params[:article][:body]
    if @article.save
			render :showRABL
    else
      render 422
    end
  end
  
	def destroy
		@article = Article.find(params[:id])
		if @article.user_id == current_user.id && @article
			@article.destroy
			render :showRABL
		else
		end
	end

end
