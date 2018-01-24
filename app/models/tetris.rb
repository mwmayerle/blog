class Tetris < ApplicationRecord

	validates :player_name, presence: true, length: { in: 1..3 }
	validates :player_score, numericality: true

	def self.format_new_score(score)
		score.slice(6, 6).to_i
	end

	def self.format_high_score(high_score)
		counter = high_score.length
		while high_score.length < 6
			high_score.insert(0, '0')
			counter += 1
		end
		high_score
	end
end