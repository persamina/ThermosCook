require 'rails_helper'

RSpec.describe UserPhoto, :type => :model do
  it "is valid when required values are present" do
    expect(build(:user_photo)).to be_valid
  end

end
