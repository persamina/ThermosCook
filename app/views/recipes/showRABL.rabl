object false
node(:id) {@recipe.id}
node(:name) {@recipe.name}
node(:description) {@recipe.description}
node(:prep_time) {@recipe.prep_time}
node(:cook_time) {@recipe.cook_time}
node(:user_id) {@recipe.user_id}
node(:likes) { @recipe.likes.count }
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
child(@recipe.taggings, :object_root => false) do |tagging|
  attributes :id, :name, :type_class
end
child(@recipe.tags, :object_root => false) do |tags|
  attributes :id, :tagable_id, :tagable_type, :tagging_id
end
child(@recipe.user, :object_root => false) do |user|
  attributes :id, :username
  node(:thumbnail_url, :if => lambda { |m| m.user_photos.count > 0}) { user.user_photos[0].photo.url(:small) }
end
node(:authenticity_token) { form_authenticity_token}
