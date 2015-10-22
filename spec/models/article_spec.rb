require 'rails_helper'

RSpec.describe Article, :type => :model do
  it 'is valid when required values are present' do
    expect(build(:article)).to be_valid
  end

  it "is not valid when title is not included" do
    expect(build(:article, title: nil)).not_to be_valid
  end

  it "doesn't allow duplicate title" do
    create(:article, title: "title")
    expect{create(:article, title: "title")}.to raise_exception(ActiveRecord::RecordInvalid)
  end

  it "has article_photos of type ArticlePhoto" do
    expect( create(:article_with_article_photo).article_photos[0]).to be_instance_of(ArticlePhoto)
  end

  it "has likes of type Like" do
    expect( create(:article_with_like).likes[0]).to be_instance_of(Like)
  end

  it "has tags of type Tag" do
    expect( create(:article_with_tag).tags[0]).to be_instance_of(Tag)
  end

  it "has user of type User" do
    expect(create(:article_with_user).user).to be_instance_of(User)
  end

end
