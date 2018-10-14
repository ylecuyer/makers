class CommentsController < ApplicationController
  def create
    comment = Comment.new(comments_params)
    comment.todo_id = params[:todo_id]
    comment.user = current_user
    comment.save
    redirect_to todos_path
  end

  private
    def comments_params
      params.require(:comment).permit(:content)
    end
end
