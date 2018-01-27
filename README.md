# Javascript Tetris

An homage to the NES version of Tetris written in Javascript. [Play the game now!](https://javascript-tetris.herokuapp.com)

##About
This iteration of Tetris is styled after the NES version. It utilizes ['hard-drops'](http://tetris.wikia.com/wiki/Hard_Drop), the [Nintendo Rotation System](http://tetris.wikia.com/wiki/Nintendo_Rotation_System), a modified scoring system, and a modified tetromino speeds.

The game logic is written in vanilla Javascript, and it utilizes Canvas in addition to some light JQuery.

## Configuration and Customization
As-is this game is attached to a Rails backend, however it can be easily integrated to any back-end that accepts JSON. The *@high_score* and *@high_scores* instance variables found in the view file (app/views/tetris/index.html.erb) are called when the page loads. *@high_score* is the highest score, while *@high_scores* is the top five scores. 

When a game is completed, JSON is sent via an AJAX request containing the score and initials of the player. The page is then reloaded using the information mentioned above.

###Scoring
Scores are calculated similarly to the [NES Tetris scoring system](http://tetris.wikia.com/wiki/Scoring), which assigns a multiplier based on the number of rows cleared. Unlike the NES version, this version assigns 5 points when a tetromino lands instead of calculating a score based on the distance that a ['soft drop'](http://tetris.wikia.com/wiki/Drop). The scoring system can be altered within the game.js file inside the Game.prototype.addToScore function.

###Game Speed
The game speed can be altered within the game.js file, in the Game.prototype.determineSpeed function. Game speed is based on the level a player is currently in. Levels increase every 10 cleared lines.

###Color Scheme
This game changes the color scheme based on the level a player is currently in. Two arrays named *solidColors* and *outlineColors* found in the tetris.js file contain all of the hex values for each color scheme. The level the player is currently in corresponds to the index of both arrays. Colors may be added, modified or deleted in these two arrays. Currently the color schemes are loosely based off of the colors used in the NES version of Tetris.

###Game Size
Two constants, boardWidth and boardHeight are found in the drawing.js file. The boardWidth constant MUST be half the size of boardHeight. If you would like to change the size of the game, changing these two variables will take care of the rendering within canvas tags. These two variables MUST match width and height attributes of the canvas tag with ID "tetris" in the view file. Unfortunately the rest of the CSS and canvas tag dimensions will have to be modified by the user, however careful preservation of ratios should make this easy.