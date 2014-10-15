object false
node(:id) {@recipe.id}
node(:name) {@recipe.name}
node(:description) {@recipe.description}
node(:user_id) {@recipe.user_id}
child(@recipe.ingredients, :object_root => false) do |ingredient|
	attributes :id, :name, :amount, :unit
end
child(@recipe.instructions, :object_root => false) do |instruction|
	attributes :id, :description, :order
end
child(@recipe.recipe_photos, :object_root => false) do |recipe_photo|
	attributes :id, :description
	node(:url) { |recipe_photo| recipe_photo.photo.url(:original)}
	node(:thumbnail_url) { |recipe_photo| recipe_photo.photo.url(:thumb)}
  node(:recipe_id) { |recipe_photo| recipe_photo.recipe_id }
  node(:name) { |recipe_photo| recipe_photo.photo_file_name }
  node(:size) { |recipe_photo| recipe_photo.photo_file_size }
  node(:delete_url) { |recipe_photo| recipe_photo_url(recipe_photo) }
  node(:delete_type) { |recipe_photo| "DELETE" }
end

node(:authenticity_token) { form_authenticity_token}
