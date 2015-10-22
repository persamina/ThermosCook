require 'rails_helper'

RSpec.describe Ingredient, :type => :model do
  it 'is valid when required values are present' do
    expect(build(:ingredient)).to be_valid
  end
end
