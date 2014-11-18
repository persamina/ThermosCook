class TagsController < ApplicationController
  before_filter :load_tagable, :except => [:destroy]
  before_filter :authenticate_user
  def index
    @tags = Tag.all
    render :indexRABL
  end

  def create
    debugger
    @tag = @tagable.tags.new(params[:tag])
    @tag.user_id = current_user.id
    if @tag.save 
      render :showRABL
    else
      render @tag, :status => :not_acceptable
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    if @tag && current_user.id = @tag.user_id
      @tag.destroy
			render :showRABL
    else
      render 401
    end
  end

private

  def load_tagable
    klass = [Recipe, Article].detect do |c|
      params["#{c.name.underscore}_id"]
    end
    @tagable = klass.find(params["#{klass.name.underscore}_id"])
  end
end
