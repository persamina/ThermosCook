require 'rails_helper'

RSpec.describe RecipePhoto, :type => :model do
  it "is valid when required values are present" do
    expect(build(:recipe_photo)).to be_valid
  end

  it "has default photo" do
    expect(build(:recipe_photo, photo: nil)).to be_valid
  end
end
