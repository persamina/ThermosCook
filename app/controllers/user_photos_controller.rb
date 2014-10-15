class UserPhotosController < ApplicationController
  before_filter :authenticate_user!, :except => [:show]
  def show
    @user_photo = UserPhoto.find(params[:id])
    if @user_photo
      render :showRABL
    else
    end
    
  end

	def create
		@user_photo = UserPhoto.new(params[:user_photo])
    @user_photo[:user_id] = current_user.id
		if @user_photo.save
      render :showRABL
		else
		end
	end

  def destroy
    @user_photo = UserPhoto.find(params[:id])
    if @user_photo
      @user_photo.destroy
      render :deleteRABL
    else

    end

  end
end
