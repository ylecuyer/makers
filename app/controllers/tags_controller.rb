class TagsController < ApplicationController
  def index
    
  end

  def show
    @tag = params[:tag]
    @todos = Todo.tagged_with(@tag)
  end
end
