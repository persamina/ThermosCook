FactoryGirl.define do
  factory :instruction do
    description Faker::Lorem.sentence
    recipe { FactoryGirl.build(:recipe) }
  end
end
