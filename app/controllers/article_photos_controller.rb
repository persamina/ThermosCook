class ArticlePhotosController < ApplicationController
  before_filter :authenticate_user!, :except => [:show]
  def show
    @article_photo = ArticlePhoto.find(params[:id])
    if @article_photo
      render :showRABL
    else
    end
  end

	def create
		@article_photo = ArticlePhoto.new(params[:article_photo])
		if @article_photo.save
      render :showRABL
		else
		end
	end

	def ckeditor_create
		@article_photo = ArticlePhoto.new
    @article_photo.photo = params[:upload]
    @article_photo.article_id = params[:article_id]
		if @article_photo.save
      url = @article_photo.photo.url('original')
      function_number = params[:CKEditorFuncNum];
      render :text => "<script type='text/javascript'>
        parent.ThermosCook.createImageResponse('"+ form_authenticity_token + "');
        window.parent.CKEDITOR.tools.callFunction(#{function_number}, '#{url}');
      </script>"
		else
		end
	end

  def destroy
    @article_photo = ArticlePhoto.find(params[:id])
    if @article_photo.article.user_id == current_user.id && @article_photo
      @article_photo.destroy
      render :deleteRABL
    else

    end

  end
end
