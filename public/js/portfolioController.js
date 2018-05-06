(function(){
'use strict'

//initialize the angular module
angular.module('app')
.controller('portfolioController', function($scope, $location){

//set location to equal $location for data binding on the template
$scope.$location = $location;

//set the portfolio path to the initial portfolio home page
$scope.portfolioTemplates = [{ name: 'home', url: 'templates/portfolio/portHome.html'},
     					{ name: 'quotes', url: 'templates/portfolio/quotes.html'},
                        { name: 'ticstart', url: 'templates/portfolio/ticstart.html'},
     					// { name: 'tictac', url: 'templates/portfolio/tictac.html'},
     					{ name: 'moviesearch', url: 'templates/portfolio/moviesearch.html'},
     					{ name: 'pagination', url: 'templates/portfolio/pagination.html'},
     					{ name: 'twitterapp', url: 'templates/portfolio/twitterapp.html'},
     					{ name: 'singlepageapp', url: 'templates/portfolio/singlepageapp.html'}];


$scope.portfolioPath = $scope.portfolioTemplates[0].url;

$scope.portClick = function(path) {
	$scope.portfolioPath = path;
}



//quotes 

//set up variables to be used in the printQuote and quote splicing functions
var message = '';
var quotes2 =[];
var quoteObject;
var spliceQuote;
var quotesIndex;

console.log(quotes2);
console.log(quotes);

//function for getting random colors
function RandomColors() {
		var red = Math.floor(Math.random() * 256);
		var green = Math.floor(Math.random() * 256);
		var blue = Math.floor(Math.random() * 256);
		var colors = 'rgb(' + red + ',' + green + ',' + blue + ')';
		return colors;
}	

$scope.loadColors = function() {

var getRandomColors = RandomColors();
        //change the background of the quote-colors div to a randomly generated linear gradient.
        document.getElementById('quote-colors').style.background = 'linear-gradient(to top,' + getRandomColors + ',' + ' transparent 100%)';

}
//load a random color when the template loads


//load a random quote when the template loads



//function for quote splicing used in the printQuote function
function QuoteSplicing() {
    //splice quotes from the original array and push them into a new array.
        quoteObject = quotes[Math.floor(Math.random() * quotes.length)];
        //store the indexOf the random quoteObject variable.
        quotesIndex = quotes.indexOf(quoteObject);
        //splice the random quote object out of the 
        spliceQuote = quotes.splice(quotesIndex, 1)[0];
        quotes2.push(spliceQuote);
        console.log(quotes);
        console.log(quotes2);

        if(quotes.length == 0) {
            quotes = quotes2;
            quotes2 = [];
        }

        return spliceQuote;
}


//function to print quotes when the template loads and the new quote button is pressed
$scope.printQuote = function() {
	QuoteSplicing();
        $scope.message = spliceQuote.quote;
        $scope.source = spliceQuote.source;
        //if the spliced quote object has a citation property, add the value to our message variable.
        if (spliceQuote.citation !== undefined) {
                $scope.citation = spliceQuote.citation;
            } else {
                $scope.citation = "No Citation Available";
            }
        //if the spliced quote object has a year property, add the value to our message variable.
        if (spliceQuote.year !== undefined) {
                $scope.year = spliceQuote.year;
            } else {
                $scope.year = "No Year Available";
            }
        
        console.log("this is the quote object after quote splicing: " + quoteObject);
        console.log("this is the quotes array object after quote splicing: " + quotes);
        console.log("this is the spliceQuote: " + spliceQuote);
        console.log("this is the quote property on spliceQuote: " + spliceQuote.quote);
        console.log("this is the quotes2 array after quote splicing: " + quotes2);
}       

$scope.clearStyles = function() {

    document.documentElement.removeAttribute("style");

}

$scope.testclick = function () {
    var innerchange = document.getElementById('testing');
    console.log(document.getElementById('testing'));
    innerchange.innerHTML = '<header><h1>Tic Tac Toe</h1><ul><li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li><li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li></ul></header><ul class="boxes"><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li></ul>';
}


var Mainboard = '<div></div>';
var Boxes;
var Player1Wins;
var Player2Wins;
var BoxesCount;
// var StartGame;
var GetNewGame;

// When the page loads, the startup screen should appear. Use the tictactoe-01-start.png mockup, 
$scope.boardLoad = function() {
    //Get the main board area's Id for modifying the DOM
    Mainboard = document.getElementById("board");
    //Change the start page to the front page once the page loads.
    // Mainboard.innerHTML = '<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button" id="Start">Start game</a></header></div>';
    //Get the button ID to start the game
    var StartGame = document.getElementById("Start");
    //Event listener for the start game button
    StartGame.on('click', function(){
        NewGame();
    });
};

    //New Game Function to create the board, count the boxes and keep track of which player's turn it is.
    var NewGame = function() {
            //Set boxes count to = 0
            BoxesCount = 0;
            //set the board up after clicking the Start button.
            Mainboard.innerHTML = '<header><h1>Tic Tac Toe</h1><ul><li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li><li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li></ul></header><ul class="boxes"><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li></ul>';
            //Make sure player 1 has class active in the beginning
            $("#player1").addClass("active");
            //Make sure player 2 doesnt have class active in the beginning
            $("#player2").removeClass("active");
            //HTML Collection of boxes
            Boxes = document.getElementsByClassName("box");
        
            //Create a BoxMouseOver function to show the X or O depending on what player's turn it is
            function BoxMouseOver() {
                return function(){
                    //If the box already has a selection, stop the function to prevent the other symbol from showing up on hover state.
                        if ($(this).hasClass("box-filled-1") || $(this).hasClass("box-filled-2")) {
                            return;
                        } 
                        //If player 1 has class active on hover show an O in the box, otherwise show an X.
                        if ($("#player1").hasClass("active")) {
                        this.style.backgroundImage = "url('../tic-tac-toe-v3/img/o.svg')";
                        } else {
                        this.style.backgroundImage = "url('../tic-tac-toe-v3/img/x.svg')";
                    }
                }
            }

            //Create a BoxMouseOut function to return the box to a blank background upon mouse exit.
            function BoxMouseOut(){
                return function(){
                        this.style.backgroundImage = "";
                    }
                }
        
            //Function for box win condition checks
            function BoxWinConditions(){
                return function(){
                        BoxesCount ++;
                        Player1Wins = false;
                        Player2Wins = false;
                        GetNewGame = document.getElementById("NewGameButton");
                        //If this box already has a selection stop the function from running (disables someone from clicking the same box again)
                        if ($(this).hasClass("box-filled-1") || $(this).hasClass("box-filled-2")) {
                            return;
                            }

                        //If player 1 has class active, then fill the box with 'o' on click
                        if ($("#player1").hasClass("active")) {
                                    $(this).addClass("box-filled-1");
                                    $("#player1").toggleClass("active");
                                    $("#player2").toggleClass("active");
                                    
                        //If player 2 has class active, fill the box with 'x' on click
                            } else if ($("#player2").hasClass("active")) {
                                $(this).addClass("box-filled-2");
                                $("#player1").toggleClass("active");
                                $("#player2").toggleClass("active");
                            }

                        //Define variables to check what boxes have X's and what boxes have O's 
                        var o0 = $(Boxes[0]).hasClass("box-filled-1");
                        var x0 = $(Boxes[0]).hasClass("box-filled-2");
                        var o1 = $(Boxes[1]).hasClass("box-filled-1");
                        var x1 = $(Boxes[1]).hasClass("box-filled-2");
                        var o2 = $(Boxes[2]).hasClass("box-filled-1");
                        var x2 = $(Boxes[2]).hasClass("box-filled-2");
                        var o3 = $(Boxes[3]).hasClass("box-filled-1");
                        var x3 = $(Boxes[3]).hasClass("box-filled-2");
                        var o4 = $(Boxes[4]).hasClass("box-filled-1");
                        var x4 = $(Boxes[4]).hasClass("box-filled-2");
                        var o5 = $(Boxes[5]).hasClass("box-filled-1");
                        var x5 = $(Boxes[5]).hasClass("box-filled-2");
                        var o6 = $(Boxes[6]).hasClass("box-filled-1");
                        var x6 = $(Boxes[6]).hasClass("box-filled-2");
                        var o7 = $(Boxes[7]).hasClass("box-filled-1");
                        var x7 = $(Boxes[7]).hasClass("box-filled-2");
                        var o8 = $(Boxes[8]).hasClass("box-filled-1");
                        var x8 = $(Boxes[8]).hasClass("box-filled-2");

                        //Check for win conditions based on index combinations
                            if (o0 && o1 && o2
                            || o3 && o4 && o5
                            || o6 && o7 && o8
                            || o0 && o3 && o6
                            || o1 && o4 && o7
                            || o2 && o5 && o8
                            || o0 && o4 && o8
                            || o2 && o4 && o6) {
                        //Change mainboard to display player 1 winning
                            Mainboard.innerHTML = '<div class="screen screen-win screen-win-one" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner!</p><a href="#" class="button" id="NewGameButton">New game</a></header></div>';
                                    Player1Wins = true;
                            GetNewGame = document.getElementById("NewGameButton");
                            GetNewGame.addEventListener("click", function(){
                            NewGame();
                    });

                        } else if (x0 && x1 && x2
                            || x3 && x4 && x5
                            || x6 && x7 && x8
                            || x0 && x3 && x6
                            || x1 && x4 && x7
                            || x2 && x5 && x8
                            || x0 && x4 && x8
                            || x2 && x4 && x6) {
                        //Change mainboard to display player 2 winning
                            Mainboard.innerHTML = '<div class="screen screen-win screen-win-two" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner!</p><a href="#" class="button" id="NewGameButton">New game</a></header></div>';
                                    Player2Wins = true;
                            GetNewGame = document.getElementById("NewGameButton");
                            GetNewGame.addEventListener("click", function(){
                            NewGame();
                    });
                        }

                        //If no player has won, and the total amount of boxes clicked is 9 the game is a tie!
                        if(!Player1Wins && !Player2Wins && BoxesCount === 9) {
                            Mainboard.innerHTML = '<div class="screen screen-win screen-win-tie" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Dang, It\'s a Tie!</p><a href="#" class="button" id="NewGameButton">New game</a></header></div>';
                            GetNewGame = document.getElementById("NewGameButton");
                            GetNewGame.addEventListener("click", function(){
                            NewGame();
                    });
                        }


                    
                
                }

            }

            //iterate through our box html collection for hover changes and choosing a box.
            for(var i = 0; i < Boxes.length; i++) {
                    Boxes[i].addEventListener('mouseover', BoxMouseOver());

                    //When you mouseout, the background goes back to empty in each box
                    Boxes[i].addEventListener('mouseout', BoxMouseOut());
                    
                    //Event listener for when a box is clicked to fill boxes and check win conditions.
                    Boxes[i].addEventListener('click', BoxWinConditions());
            }
        }


});	//end controller
})(); //end self invoked function