FactoryGirl.define do
  factory :ingredient do
    sequence :name do |n|
      "ingredient#{n}"
    end
    amount "5"
    unit "cup"
    recipe { FactoryGirl.build(:recipe) }
  end
end
