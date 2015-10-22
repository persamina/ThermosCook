require 'rails_helper'

RSpec.describe Tagging, :type => :model do
  it "is valid when required values are present" do
    expect(build(:recipe_tagging)).to be_valid
  end
end
