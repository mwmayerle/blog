class TetrisController < ApplicationController

	def index
		@high_scores = Tetris.limit(5).order(player_score: :desc).all
		
		@high_score = Tetris.format_high_score(@high_scores.first.player_score.to_s)
	end
	
	def create
		score = Tetris.format_new_score(params[:player_score])

		player_stats = Tetris.create(player_score: score, player_name: params[:player_name])

		@high_scores = Tetris.limit(5).order(player_score: :desc).all
		@high_score = Tetris.format_high_score(@high_scores.first.player_score.to_s)

		respond_to do |format|
			format.json {
				render json: {}, status: 200
			}
			format.html {
				render :index
			}
		end
	end
end
