collection @recipes, :object_root => false 
  attributes :id, :name, :description, :user_id
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
