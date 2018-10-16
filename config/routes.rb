Rails.application.routes.draw do
  devise_for :users
  root to: 'todos#index'

  resources :users
  resources :todos do
    resources :comments
    member do
      post 'reaction'
    end
  end
end
