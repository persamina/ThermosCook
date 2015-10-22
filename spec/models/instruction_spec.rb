require 'rails_helper'

RSpec.describe Instruction, :type => :model do

  it 'is valid when required values are present' do
    expect(build(:instruction)).to be_valid
  end

end
