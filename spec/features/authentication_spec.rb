require 'rails_helper'

feature "the signup  and sign in process" do

  scenario "has a new user page", :js => true do
    visit "/#users/sign_up"
    expect(page).to have_content("Sign Up")
  end

  scenario "signs up new user", :js => true, :noclean => true do
    visit "/#users/sign_up"
    fill_in("user[email]", :with => "test@example.com") 
    fill_in("user[username]", :with => "tester") 
    fill_in("user[password]", :with => "password") 
    fill_in("user[password_confirmation]", :with => "password") 
    click_on("Sign Up!")
    expect(page).to have_content("a confirmation email was sent check your email to confirm account and log in.")
  end

  scenario "doesn't allow duplicate username or emails", :js => true, :noclean => true do
    visit "/#users/sign_up"
    fill_in("user[email]", :with => "test@example.com") 
    fill_in("user[username]", :with => "tester") 
    fill_in("user[password]", :with => "password") 
    fill_in("user[password_confirmation]", :with => "password") 
    click_on("Sign Up!")
    expect(page).to have_content("Email has already been taken. Username has already been taken.")
  end

  scenario "verifies passwords match", :js => true, :noclean => true do
    visit "/#users/sign_up"
    fill_in("user[email]", :with => "test@example.com") 
    fill_in("user[username]", :with => "tester") 
    fill_in("user[password]", :with => "password") 
    fill_in("user[password_confirmation]", :with => "passwordw") 
    click_on("Sign Up!")
    expect(page).to have_content("Password confirmation must be the same as Password.")
  end

  scenario "recieves confirmation email", :js => true, :noclean => true do
    sleep 1
    open_email("test@example.com")
    debugger
    expect(current_email).to have_content("Welcome test@example.com")
    expect(current_email).to have_content("Welcome test@example.com")
    click_on("Confirm my account")
    clear_emails
  end
    

  scenario "sign in user", :js => true, :noclean => true do
    visit "/#users/sign_in"
    fill_in("user[email]", :with => "test@example.com") 
    fill_in("user[password]", :with => "password") 
    click_on("Sign In")
    click_on("user_drop")
    expect(page).to have_content("Sign Out")
  end

end
