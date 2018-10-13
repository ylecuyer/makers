Rails.application.routes.draw do
  devise_for :users
  root to: 'todos#index'

  resources :todos do
    member do
      post 'reaction'
    end
  end
end
