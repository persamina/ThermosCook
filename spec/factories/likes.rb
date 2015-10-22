FactoryGirl.define do
  factory :recipe_like, class: Like do
    user { FactoryGirl.create(:user) }
    association :likeable, factory: :recipe
  end

  factory :article_like, class: Like do
    user { FactoryGirl.create(:user) }
    association :likeable, factory: :article
  end
end
