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
node(:authenticity_token) { |m| form_authenticity_token }

