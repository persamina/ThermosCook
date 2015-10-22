FactoryGirl.define do
  factory :recipe_photo do
    photo File.new(Rails.root + "public/portrait_blank.jpg")
    description Faker::Lorem.sentence
    recipe { FactoryGirl.build(:recipe) }
  end
end
