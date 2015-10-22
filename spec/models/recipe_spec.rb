require 'rails_helper'

RSpec.describe Recipe do

  let(:user) { FactoryGirl.build(:user) }

  it 'is valid when required values are present' do
    expect(build(:recipe)).to be_valid
  end

  it "is not valid when name is not included" do
    expect(build(:recipe, name: nil)).not_to be_valid
  end

  it "doesn't allow duplicate names" do
    create(:recipe, name: "name")
    expect{create(:recipe, name: "name")}.to raise_exception(ActiveRecord::RecordInvalid)
  end

  it "has ingredients of type Ingredient" do
    expect( create(:recipe_with_ingredients_instructions).ingredients[0]).to be_instance_of(Ingredient)
  end

  it "has instructions of type Instruction" do
    expect( create(:recipe_with_ingredients_instructions).instructions[0]).to be_instance_of(Instruction)
  end

  it "has recipe_photos of type RecipePhoto" do
    expect( create(:recipe_with_recipe_photo).recipe_photos[0]).to be_instance_of(RecipePhoto)
  end

  it "has likes of type Like" do
    debugger
    expect( create(:recipe_with_like, user: user ).likes[0]).to be_instance_of(Like)
  end

  it "has tags of type Tag" do
    debugger
    expect( create(:recipe_with_tag, user: user).tags[0]).to be_instance_of(Tag)
  end

  it "has user of type User" do
    debugger
    expect( create(:recipe_with_user, user: user).user).to be_instance_of(User)
  end
end
