class CreateTetris < ActiveRecord::Migration[5.1]
  def change
    create_table :tetris do |t|
    	t.string   :player_name, null: false
    	t.integer  :player_score, null: false

    	t.timestamps
    end
  end
end
