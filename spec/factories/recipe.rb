FactoryGirl.define do
  factory :recipe do 
    name Faker::Lorem.word
    description Faker::Lorem.sentence
    prep_time 5
    cook_time 80
    servings 3

    factory :recipe_with_ingredients_instructions, parent: :recipe do
      transient do
        ingredient_count 5
        instruction_count 5
      end

      after(:build) do |recipe, evaluator|
        create_list(:ingredient, evaluator.ingredient_count,  recipe: recipe)
        create_list(:instruction, evaluator.instruction_count,  recipe: recipe)
      end
    end

    factory :recipe_with_recipe_photo, parent: :recipe do
      after(:build) do |recipe |
        create(:recipe_photo, recipe: recipe)
      end
    end

    factory :recipe_with_like, parent: :recipe_with_user do 
      after(:build) do |recipe|
        create(:recipe_like, user: recipe.user, likeable: recipe)
      end
    end

    factory :recipe_with_tag, parent: :recipe_with_user do
      after(:build) do |recipe |
        create(:recipe_tag, user: recipe.user, tagable: recipe)
      end
    end

    factory :recipe_with_user, parent: :recipe do
        user { FactoryGirl.create(:user) }
    end


  end
end
