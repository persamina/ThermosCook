object false
node(:id) {@article.id}
node(:name) {@article.title}
node(:body) {@article.body}
child(@article.article_photos, :object_root => false) do |article_photo|
	attributes :id, :description
	node(:url) { |article_photo| article_photo.photo.url(:original)}
	node(:thumbnail_url) { |article_photo| article_photo.photo.url(:thumb)}
  node(:article) { |article_photo| article_photo.recipe_id }
  node(:name) { |article_photo| article_photo.photo_file_name }
  node(:size) { |article_photo| article_photo.photo_file_size }
  node(:delete_url) { |article_photo| article_photo(article_photo) }
  node(:delete_type) { |article_photo| "DELETE" }
end
