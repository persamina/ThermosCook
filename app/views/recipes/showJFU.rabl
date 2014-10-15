collection @recipe.recipe_photos, :root => :files, :object_root => false
node(:id) { |recipe_photo| recipe_photo.id }
node(:name) { |recipe_photo| recipe_photo.photo_file_name}
node(:size) { |recipe_photo| recipe_photo.photo_file_size}
node(:url) { |recipe_photo| recipe_photo.photo.url(:original)}
node(:description) { |recipe_photo| recipe_photo.description}
node(:thumbnail_url) { |recipe_photo| recipe_photo.photo.url(:thumb) }
node(:delete_url) { |recipe_photo| "recipe_photos/#{recipe_photo.id}" } 
node(:delete_type) { "DELETE" }
node(:authenticity_token) { form_authenticity_token}
