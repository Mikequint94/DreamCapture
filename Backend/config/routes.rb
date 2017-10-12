Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resource :session, only: %i[create destroy]
    resources :users, only: %i[create update] do
      resources :dreams, only: %i[index]
    end

    resources :dreams, except: %i[index new edit] do
      # resources :notes, only: %i[index]
    end

    resources :keywords, only: %i[create destroy index]
    resources :notes, only: %i[create update destroy]
  end

end
