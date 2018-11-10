Rails.application.routes.draw do
  devise_for :users
  root to: 'todos#index'

  resources :tags, only: [:index, :show], param: :tag

  resources :users
  resources :todos do
    resources :comments
    member do
      post 'reaction'
    end
  end
end
