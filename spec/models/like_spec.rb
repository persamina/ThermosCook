require 'rails_helper'

RSpec.describe Like, :type => :model do
  it 'is valid when required values are present' do
    expect(build(:recipe_like)).to be_valid
  end
end
