collection @user_photo, :root => "files", :object_root => false
node(@user_photo.photo_file_name) {true}
node(:authenticity_token) { form_authenticity_token}
