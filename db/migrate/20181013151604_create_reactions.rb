class CreateReactions < ActiveRecord::Migration[5.2]
  def change
    create_table :reactions do |t|
      t.string :emoji
      t.references :todo, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
