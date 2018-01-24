class Tetris < ApplicationRecord

	validates :player_name, presence: true, length: { in: 1..16 }
	validates :player_score, numericality: true

	def self.process_score(score)
		score.slice(6, 6).to_i
	end

end