collection @recipes, :object_root => false 
  attributes :id, :name, :description, :user_id, :prep_time, :cook_time, :servings
  node(:likes) { |recipe| recipe.likes.count }
  child(:ingredients, :object_root => false) { attributes :id, :name, :amount, :unit } 
  child(:instructions, :object_root => false) { attributes :id, :description }
  child(:recipe_photos, :object_root => false) do |recipe_photo|
    attributes :id, :description, :ratio
    node(:url) { |recipe_photo| recipe_photo.photo.url(:original)}
    node(:thumbnail_url) { |recipe_photo| recipe_photo.photo.url(:thumb)}
    node(:recipe_id) { |recipe_photo| recipe_photo.recipe_id }
    node(:name) { |recipe_photo| recipe_photo.photo_file_name }
    node(:size) { |recipe_photo| recipe_photo.photo_file_size }
    node(:delete_url) { |recipe_photo| recipe_photo_url(recipe_photo) }
    node(:delete_type) { |recipe_photo| "DELETE" }
  end
  child(:taggings, :object_root => false) do |tagging|
    attributes :id, :name, :type_class
  end
  child(:tags, :object_root => false) do |tags|
    attributes :id, :tagable_id, :tagable_type, :tagging_id
  end
  child(:user, :object_root => false) do |user|
    attributes :id, :username
    node(:thumbnail_url, :if => lambda { |m| m.user_photos.count > 0}) { user.user_photos[0].photo.url(:small) }
  end
