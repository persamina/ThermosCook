FactoryGirl.define do
  factory :recipe_tag, class: Tag do
    user { FactoryGirl.create(:user) }
    association :tagable, factory: :recipe
    tagging FactoryGirl.build(:recipe_tagging)
  end

  factory :article_tag, class: Tag do
    user { FactoryGirl.create(:user) }
    association :tagable, factory: :article
    tagging FactoryGirl.build(:article_tagging)
  end

end
