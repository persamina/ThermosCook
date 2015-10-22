FactoryGirl.define do
  factory :user do
    email Faker::Internet.email
    password "password"
    password_confirmation "password"
    username Faker::Internet.user_name

    factory :user_with_recipe, parent: :user do 
      transient do
        recipe_count 1
      end

      after(:create) do |user, evaluator|
        create_list(:recipe, evaluator.recipe_count, user: user)
      end
    end

    factory :user_with_photo, parent: :user do
      after(:create) do |user|
        create(:user_photo, user: user)
      end
    end

    factory :user_with_like, parent: :user do
      after(:create) do |user|
        create(:recipe_like, user: user)
      end
    end

  end
end
