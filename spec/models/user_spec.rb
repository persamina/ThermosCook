require 'rails_helper'

RSpec.describe User, :type => :model do
  it 'is valid when required values are present' do
    expect(build(:user)).to be_valid
  end

  it 'is not valid when username not included' do
    expect(build(:user, username: nil)).not_to be_valid
  end
  
  it 'is not valid when email not included' do
    expect(build(:user, email: nil)).not_to be_valid
  end

  it 'is not valid when passwords do not match' do
    expect{create(:user, password: "12345678", password_confirmation: "abcdefghi")}.to raise_exception(ActiveRecord::RecordInvalid)
  end

  it "doesn't allow duplicate usernames" do
    create(:user, username: "username")
    expect{create(:user, username: "username")}.to raise_exception(ActiveRecord::RecordInvalid)
  end
  
  it "doesn't allow duplicate emails" do
    create(:user, email: "a@b.com")
    expect{create(:user, email: "a@b.com")}.to raise_exception(ActiveRecord::RecordInvalid)
  end
  
  it "has recipes of type Recipe" do
    expect(create(:user_with_recipe).recipes[0]).to be_instance_of(Recipe)
  end

  it "has user photos of type UserPhoto" do
    expect(create(:user_with_photo).user_photos[0]).to be_instance_of(UserPhoto)
  end

  it "has likes of type Like" do
    expect(create(:user_with_like).likes[0]).to be_instance_of(Like)
  end

end
