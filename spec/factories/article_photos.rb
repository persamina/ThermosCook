FactoryGirl.define do
  factory :article_photo do
    photo File.new(Rails.root + "public/portrait_blank.jpg")
    description Faker::Lorem.sentence
    article { FactoryGirl.build(:article) }
  end

end
