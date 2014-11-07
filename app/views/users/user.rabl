object @user 
attributes :id, :email, :username
child(@user.user_photos, :object_root => false) do |user_photo|
  attributes :id
	node(:url) { |user_photo| user_photo.photo.url(:original)}
	node(:thumbnail_url) { |user_photo| user_photo.photo.url(:small)}
  node(:user_id) { |user_photo| user_photo.user_id}
  node(:name) { |user_photo| user_photo.photo_file_name }
  node(:size) { |user_photo| user_photo.photo_file_size }
  node(:delete_url) { |user_photo| user_photo_url(user_photo) }
  node(:delete_type) { |user_photo| "DELETE" }
end
child(@user.recipes, :object_root => false) do |recipe|
  attributes :id, :name, :description, :user_id
  child :ingredients, :object_root => false do
	  attributes :id, :name, :amount, :unit
  end
  child :instructions, :object_root => false do
	  attributes :id, :description, :order
  end
  child :recipe_photos, :object_root => false do
    attributes :id, :description
	  node(:url) { |recipe_photo| recipe_photo.photo.url(:original)}
    node(:thumbnail_url) { |recipe_photo| recipe_photo.photo.url(:thumb)}
    node(:recipe_id) { |recipe_photo| recipe_photo.recipe_id }
    node(:name) { |recipe_photo| recipe_photo.photo_file_name }
    node(:size) { |recipe_photo| recipe_photo.photo_file_size }
    node(:delete_url) { |recipe_photo| recipe_photo_url(recipe_photo) }
    node(:delete_type) { |recipe_photo| "DELETE" }
  end

end
child(@user.likes, :object_root => false) do |like|
  node(:id) { |like| like.id }
  node(:user_id) { |like| like.user_id }
  node(:likeable_id) { |like| like.likeable_id }
  node(:likeable_type) { |like|  like.likeable_type}
  node(:recipe_id, :if => lambda { |m| m.likeable_type == "Recipe"}) { |like| like.likeable_id }
  node(:article_id, :if => lambda { |m|  m.likeable_type == "Article"}) { |like| like.likeable_id }
  
end
node(:authenticity_token) { |m| form_authenticity_token }

