class InstructionsController < ApplicationController
	def create
		@instruction = Instruction.new(params[:instruction])
		debugger
		if @instruction.save
		else
		end
	end

  def update
    @instruction= Instruction.find(params[:id])
    if @instruction.update_attributes(params[:instruction])
    else
      render 422
    end
  end

	def destroy
		@instruction = Instruction.find(params[:id])
		if @instruction.destroy
		else
		end
	end
end
