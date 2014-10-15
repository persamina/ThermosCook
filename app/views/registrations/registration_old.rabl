collection @user, :root => "files", :object_root => false
node(:id, :if => lambda { |m|  @user.errors.messages.count == 0}) {@user.id}
node(:delete_url, :if => lambda { |m| @user.errors.messages.count == 0} ) { user_registration_url(@user) }
node(:delete_type, :if => lambda { |m| @user.errors.messages.count == 0} ) { "DELETE" }
node(:messages, :if => lambda { |m| @user.errors.messages.count > 0} ) { @user.errors.messages }
node(:notice, :if => lambda { |m| @user.errors.messages.count == 0} ) {"Check your email for a confirmation email to activate your account." }
node(:authenticity_token) { form_authenticity_token }
