FactoryGirl.define do
  factory :article do
    title Faker::Lorem.word
    body Faker::Lorem.paragraph
    
    factory :article_with_like, parent: :article do
      after(:build) do |article|
        create(:article_like, likeable: article)
      end
    end

    factory :article_with_tag, parent: :article do
      after(:build) do |article|
        create(:article_tag, tagable: article)
      end
    end

    factory :article_with_article_photo, parent: :article do
      after(:build) do |article|
        create(:article_photo, article: article)
      end
    end

    factory :article_with_user, parent: :article do
      after(:build) do |article|
        article.user = FactoryGirl.create(:user)
      end
    end

  end
end
