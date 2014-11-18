collection @recipes, :object_root => false 
  attributes :id, :name, :description, :user_id, :prep_time, :cook_time
  node(:likes) { |recipe| recipe.likes.count }
  child(:ingredients, :object_root => false) { attributes :id, :name, :amount, :unit } 
  child(:instructions, :object_root => false) { attributes :id, :description }
  child(:recipe_photos, :object_root => false) do |recipe_photo|
    attributes :id, :description
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
