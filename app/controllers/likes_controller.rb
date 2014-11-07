class LikesController < ApplicationController
  before_filter :load_likeable, :except => [:destroy]
  def create
    @like = @likeable.likes.new(params[:like])
    @like.user_id = current_user.id
    if @like.save
      render :showRABL
    else
      render @like, :status => :not_acceptable
    end 

  end

  def destroy
    @like = Like.find(params[:id])
		if @like && current_user.id == @like.user_id
			@like.destroy
			render :showRABL
		else
      render 401
		end
    

  end

private
  
  def load_likeable
    klass = [Recipe, Article].detect do |c|
      params["#{c.name.underscore}_id"]
    end
    @likeable = klass.find(params["#{klass.name.underscore}_id"])
  end

end
