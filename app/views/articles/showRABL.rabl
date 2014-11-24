object false
node(:id) {@article.id}
node(:user_id) {@article.user_id}
node(:name) {@article.title}
node(:body) {@article.body}
node(:pinned) {@article.pinned}
node(:likes) { @article.likes.count }
child(@article.article_photos, :object_root => false) do |article_photo|
	attributes :id, :description
	node(:url) { |article_photo| article_photo.photo.url(:original)}
	node(:thumbnail_url) { |article_photo| article_photo.photo.url(:thumb)}
  node(:article_id) { |article_photo| article_photo.article_id }
  node(:name) { |article_photo| article_photo.photo_file_name }
  node(:size) { |article_photo| article_photo.photo_file_size }
  node(:delete_url) { |article_photo| article_photo_url(article_photo) }
  node(:delete_type) { |article_photo| "DELETE" }
end
