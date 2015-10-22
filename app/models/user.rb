class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :username, :remember_me, :photo
  validates :username, :email, :presence => true
  validates :username, :email, :uniqueness => true
  # attr_accessible :title, :body
	has_many :user_photos, :dependent => :destroy, :inverse_of => :user
	has_many :recipes, :dependent => :destroy, :inverse_of => :user
  has_many :likes, :dependent => :destroy, :inverse_of => :user
	has_many :articles, :dependent => :destroy, :inverse_of => :user
end
