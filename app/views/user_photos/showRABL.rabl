collection @user_photo, :root => "files", :object_root => false
node(:id) {@user_photo.id }
node(:user_id) {@user_photo.user_id }
node(:name) { @user_photo.photo_file_name }
node(:size) { @user_photo.photo_file_size }
node(:url) { @user_photo.photo.url(:original) }
node(:thumbnail_url) { @user_photo.photo.url(:small) }
node(:delete_url) { user_photo_url(@user_photo) }
node(:delete_type) { "DELETE" }
node(:authenticity_token) { form_authenticity_token}
