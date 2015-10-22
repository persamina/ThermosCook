FactoryGirl.define do
  factory :recipe_tagging, class: Tagging do
    name Faker::Lorem.word
    type_class "Recipe"
  end

  factory :article_tagging, class: Tagging do
    name Faker::Lorem.word
    type_class "Article"
  end

end
