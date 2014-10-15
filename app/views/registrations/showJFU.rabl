collection @user.user_photos, :root => :files, :object_root => false
node(:id) { |user_photo| user_photo.id }
node(:name) { |user_photo| user_photo.photo_file_name}
node(:size) { |user_photo| user_photo.photo_file_size}
node(:url) { |user_photo| user_photo.photo.url(:original)}
node(:thumbnail_url) { |user_photo| user_photo.photo.url(:small) }
node(:delete_url) { |user_photo| "user_photos/#{user_photo.id}" } 
node(:delete_type) { "DELETE" }
node(:authenticity_token) { form_authenticity_token}
