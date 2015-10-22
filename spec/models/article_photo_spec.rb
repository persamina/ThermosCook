require 'rails_helper'

RSpec.describe ArticlePhoto, :type => :model do
  it "is valid when required values are present" do
    expect(build(:article_photo)).to be_valid
  end
  it "has default photo" do
    expect(build(:article_photo, photo: nil)).to be_valid
  end

end
