class TetrisController < ApplicationController

	def index
		@high_scores = Tetris.limit(5).order(player_score: :desc).all
		if @high_scores.length > 0
			@high_score = Tetris.format_high_score(@high_scores.first.player_score.to_s)
		else
			@high_score = 0
		end
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
