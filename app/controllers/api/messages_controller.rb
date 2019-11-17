class Api::MessagesController < ApplicationController
  def index
# ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
group = Group.find(params[:group_id])

# 取得したグループでのメッセージ達から、idがlast_message_idよりも新しい(大きい)メッセージ達のみを取得
@messages = group.messages.includes(:user).where("id > ?", params[:id])
# data: {id: last_message_id}を参照してparams[:id]

  end
end



