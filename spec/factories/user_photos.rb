FactoryGirl.define do
  factory :user_photo do
    photo File.new(Rails.root + "public/portrait_blank.jpg")
  end

end
