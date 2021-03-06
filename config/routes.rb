ThermosCook::Application.routes.draw do

  mount Ckeditor::Engine => '/ckeditor'

    #namespace :mercury do
      #resources :images
    #end


  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'} 
  devise_scope :user do 
    get "users/:id/showJFU", to: "registrations#showJFU"
  end

  resources :registrations, :only => [] do
  end

	resources :recipes, :only => [:index, :show, :create, :update, :destroy] do 
    get :showJFU
    get "taggings/:id", to: "recipes#taggingsIndex", on: :collection
    get "search", to: "recipes#taggingsSearch", on: :collection

  end
  resources :articles, :only => [:create, :update, :destroy] do
    get :showJFU
  end

	resources :instructions, :only => [:create, :update, :destroy]
	resources :ingredients, :only => [:create, :update, :destroy]
	resources :recipe_photos, :only => [:create, :destroy, :show]
	resources :user_photos, :only => [:create, :destroy, :show]
	resources :likes, :only => [:create, :destroy]
	resources :tags, :only => [:create, :destroy] do
  end
	resources :taggings, :only => [:create, :destroy] do
    collection do
      get :recipe_taggings
      get :article_taggings
    end
  end
  
  resources :articles, :only => [:index, :show, :create, :update, :destroy]
	resources :article_photos, :only => [:create, :update, :destroy, :show]
  post "articles/:article_id/article_photo", to: "article_photos#ckeditor_create"

	root to: "recipes#index"
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
