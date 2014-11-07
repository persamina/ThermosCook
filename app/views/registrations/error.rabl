node(:messages, :if => lambda { |m| @user.errors.messages.count > 0} ) { @user.errors.messages }
node(:authenticity_token) { form_authenticity_token }
