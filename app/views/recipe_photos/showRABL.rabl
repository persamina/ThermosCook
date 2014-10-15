collection @recipe_photo, :root => "files", :object_root => false
node(:id) {@recipe_photo.id }
node(:recipe_id) {@recipe_photo.recipe_id }
node(:name) { @recipe_photo.photo_file_name }
node(:size) { @recipe_photo.photo_file_size }
node(:url) { @recipe_photo.photo.url(:original) }
node(:description) { @recipe_photo.description }
node(:thumbnail_url) { @recipe_photo.photo.url(:thumb) }
node(:delete_url) { recipe_photo_url(@recipe_photo) }
node(:delete_type) { "DELETE" }
node(:authenticity_token) { form_authenticity_token}
