class TetrisController < ApplicationController

	def index
		@high_scores = Tetris.limit(10).order(player_score: :desc).all
	end
	
	def create
		score = Tetris.process_score(params[:player_score])

		player_stats = Tetris.create(player_score: score, player_name: params[:player_name])

		@high_scores = Tetris.limit(10).order(player_score: :desc).all

		respond_to do |format|
			format.json {
				render json: @high_scores, status: 200
			}
			format.html {
				render :index
			}
		end
	end
end
