(function(){

'use strict';

//instantiate angular app and setup config for template routes
angular
.module('app', ['ngRoute','ngAnimate'])
.config(config);

//config function for routes
function config($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider
	//home page route
	.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'mainController'
	})
	//skills page route
	.when('/about', {
		templateUrl: 'templates/about.html',
		controller: 'skillsController'
	})
	//quotes page route
	.when('/quotes', {
		templateUrl: 'templates/quotes.html',
		controller: 'quotesController'
	})
	//contact page route
	.when('/contact', {
		templateUrl: 'templates/contact.html',
		controller: 'contactController'
	})
	.when('/portfolio', {
		templateUrl: 'templates/portfolio.html',
		controller: 'portfolioController' //change this eventually, just using contactController as a default
	})
	.when('/recipes', {
		templateUrl: 'templates/recipes.html',
		controller: 'recipesController'
	})
	.when('/edit/:id', {
        controller: 'RecipeDetailController',
        controllerAs: 'vm',
        templateUrl: 'templates/recipe-detail.html'
    })
    .when('/add', {
        controller: 'RecipeDetailController',
        controllerAs: 'vm',
        templateUrl: 'templates/recipe-detail.html'
    })
	//when all else fails direct to the home page
	.otherwise({
		redirectTo: '/'
	});


} //end function config
})(); //end self invoking function.
(function(){
'use strict'

//initialize the angular module
angular.module('app')
.controller('contactController', function($scope, $location){

//set location to equal $location for data binding on the template
$scope.$location = $location;







});	//end controller
})(); //end self invoked function
(function(){
'use strict';

angular.module('app')
.service('dataService', function($http){
	//get all recipes
	this.getRecipes = function(callback) {
		$http.get('http://localhost:5000/api/recipes')
		.then(callback)
	}
	//get recipes from a category
	this.getRecipesCategory = function(category, callback) {
		$http.get('http://localhost:5000/api/recipes?category=' + category)
		.then(callback)

	}
	//get a recipe by ID
	this.getRecipesId = function(id, callback) {
		$http.get('http://localhost:5000/api/recipes/' + id)
		.then(callback)

	}
	//updates a recipe by ID
	this.putID = function(id, data, callback, error) {
		$http.put('http://localhost:5000/api/recipes/' + id, data)
		.then(callback, error)

	}
	//adds a recipe
	this.addRecipe = function(recipe, callback, error) {
		$http.post('http://localhost:5000/api/recipes', recipe)
		.then(callback, error);
	}
	//deletes a recipe by ID
	this.deleteRecipe = function(id, callback) {
		$http.delete('http://localhost:5000/api/recipes/' + id)
		.then(callback);

	}
	//gets alll the recipe categories
	this.getCategories = function(callback) {
		$http.get('http://localhost:5000/api/categories')
		.then(callback);
	}
	//gets all of the food items
	this.getFoodItems = function(callback) {
		$http.get('http://localhost:5000/api/fooditems')
		.then(callback);

	}



}); //end service
})(); //end self invoked function
(function(){
'use strict'

//initialize the angular module
angular.module('app')
.controller('mainController', function($scope, $location){

//set location to equal $location for data binding on the template
$scope.$location = $location;

//add a function to skills that changes the path to the skills template once triggered
$scope.about = function() {

	$location.path('/about');
} 
//add a function to contact that changes the path to the contact template once triggered
$scope.contact = function() {

	$location.path('/contact');

}
//add a function to quotes that changes the path to the quotes template once triggered
$scope.quotes = function() {

	$location.path('/quotes');

}

$scope.portfolio = function() {

	$location.path('/portfolio');
}



});	//end controller
})(); //end self invoked function
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
     					{ name: 'pagination', url: 'templates/portfolio/pagination.html'},
     					{ name: 'redwolf', url: 'templates/portfolio/redwolf.html'},
     					{ name: 'singlepageapp', url: 'templates/portfolio/singlepageapp.html'}];


$scope.portfolioPath = $scope.portfolioTemplates[0].url;

$scope.portClick = function(path) {
	$scope.portfolioPath = path;
    
}

$scope.finishLoading = function(path) {
    if ($scope.portfolioPath === $scope.portfolioTemplates[2].url) {
        console.log('the path is pagination');
        pagination();
    }
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

//function to clear the background styles so our main page stays clean after running the quotes project.
$scope.clearStyles = function() {

    document.documentElement.removeAttribute("style");

}



//*******************************
//******** Tic Tac Toe Game *****
//*******************************

$scope.tictacStart = function () {
    mainHtml = document.getElementById('main-html');
    mainHtml.innerHTML = '<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><button class="button" id="Start">Start game</button></header></div>';
    // mainHtml.innerHTML = '<header><h1>Tic Tac Toe</h1><ul><li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li><li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li></ul></header><ul class="boxes"><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li></ul>';
    // NewGame();
    gameStart();
}

//function to listen for the game start and call the new game.
function gameStart(){
var StartGame = document.getElementById('Start');
StartGame.addEventListener('click', function(){
    NewGame();
});
}

var mainHtml;
// var Mainboard = '<div></div>';
var Boxes;
var Player1Wins;
var Player2Wins;
var BoxesCount;
// var StartGame;
var GetNewGame;



    //New Game Function to create the board, count the boxes and keep track of which player's turn it is.
    var NewGame = function() {
            console.log("new game function running");
            //Set boxes count to = 0
            BoxesCount = 0;
            //set the board up after clicking the Start button.
            mainHtml.innerHTML = '<header><h1>Tic Tac Toe</h1><ul><li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li><li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li></ul></header><ul class="boxes"><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li></ul>';
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
                        this.style.backgroundImage = "url('../../images/o.svg')";
                        } else {
                        this.style.backgroundImage = "url('../../images/x.svg')";
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
                            mainHtml.innerHTML = '<div class="screen screen-win screen-win-one" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner!</p><button class="button" id="NewGameButton">New game</button></header></div>';
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
                            mainHtml.innerHTML = '<div class="screen screen-win screen-win-two" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner!</p><button class="button" id="NewGameButton">New game</button></header></div>';
                                    Player2Wins = true;
                            GetNewGame = document.getElementById("NewGameButton");
                            GetNewGame.addEventListener("click", function(){
                            NewGame();
                    });
                        }

                        //If no player has won, and the total amount of boxes clicked is 9 the game is a tie!
                        if(!Player1Wins && !Player2Wins && BoxesCount === 9) {
                            mainHtml.innerHTML = '<div class="screen screen-win screen-win-tie" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Dang, It\'s a Tie!</p><button class="button" id="NewGameButton">New game</button></header></div>';
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


//*********************
//****** Movie Search
//*********************
//*********************



//start the moviestart function when 
$scope.movieStart = function () {
    mainHtml = document.getElementById('main-html');
    // add - <label class="is-hidden" for="year">Any Year</label><input type="text" maxlength="4" name="year" id="year" placeholder="Year"> before the search button and set year parameters to filter by year.
    mainHtml.innerHTML = '<div class="movie-search-doc"><div class="main-header"><div class="inner"><h1 class="main-title">MovieSearch</h1><form class="search-form"><label class="is-hidden" for="search">Search a title</label><input type="search" name="search" id="search" placeholder="Search a Title..."><button type="submit" id="submit" class="search-button"><i class="material-icons icn-search">search</i></button></form></div></div><div class="main-content clearfix"><ul id="movies" class="movie-list"></ul></div></div>';
//stop the form from resetting the page
$('form').submit(function(evt){
        console.log("form submitted");
        evt.preventDefault();

var omdb = "http://www.omdbapi.com/?apikey=8ef2a0ef&"; //remove api key before deploying!
var search = $("#search").val();
//create omdb paramaters object
var params = {
    s: search,
    r: "json",
};

//create a function for 0 returned movie results to display no movies were found that match the search variable.
function errorMovies() {
    var errorHTML = '';
    errorHTML += '<li class="no-movies">';
    errorHTML += '<i class="material-icons icon-help">';
    errorHTML += 'help_outline' + '</i>';
    errorHTML += 'No movies found that match:' + '' + search + '.';
    errorHTML += '</li>';
    $('#movies').html(errorHTML);
    return;
}

//create a function to iterate over the array returned from our omdb api, create list items for each item returned.
function displayMovies(data) {
        var movieHTML = '';
    $.each(data.Search, function(i, movie) {
        movieHTML += '<li>';
        movieHTML += '<div class="poster-wrap">';
        //if the movie poster does not return "N/A" show the poster
    if (movie.Poster != "N/A") {
        movieHTML += '<img class="movie-poster" src="' + movie.Poster + '" >';
        //otherwise show a placeholder icon
    } else if (movie.Poster == "N/A") {
        movieHTML += "<i class='material-icons poster-placeholder'>crop_original</i>";
    }
        movieHTML += '</div>';
        movieHTML += '<span class="movie-title">';
        movieHTML += movie.Title;
        movieHTML += '</span>';
        movieHTML += '<span class="movie-year">';
        movieHTML += movie.Year;
        movieHTML += '</span>';
        movieHTML += '</li>';
    });

//if no data response, run errorMovies function
if (data.Response == "False") {
    errorMovies();
} else {
//add the movieHTML to the movies unordered list.
$('#movies').html(movieHTML);
}  //end if conditional for movie errors.

} //end function displayMovies

//create a getJSON request pass it the OMDB api, the params parameters and the displayMovies callback.
$.getJSON(omdb, params, displayMovies);

}); //end form submit

} //end moviestart




//*********************
//******* Pagination


function pagination() {
//append search bar to the page
$(".page-header").append('<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>');
//add pagination to the page
$(".page").append('<div class="pagination"><ul class="page-numbers"></ul></div>');

//define global variables
var $StudentsToHide;
var $StudentsToShow;
var inputValue = $('.student-search input').val().toLowerCase();

    //set number of students to show on each page 
    $StudentsToShow = $('.student-item h3').filter(function() {
        if ($(this).text().indexOf(inputValue) >= 0) {
            return true;
        }
    });

    //show the first 10 students
    $StudentsToShow.each(function(index) {
        var $StudentParent = $(this).parents('.student-item');
        if (index < 10) {
            $StudentParent.show();
        } else {
            $StudentParent.hide();
        }
    });

    //append li items to the bottom
        for (var i = 0; i < Math.ceil($StudentsToShow.length / 10); i++) {
            
            var $anchortag;
            var $li = $('<li></li>');
            $(".page-numbers").append($li);

            if (i === 0) {
                $anchortag = $('<div class="active">' + (i+1) + '</div>');
            } else {
                $anchortag = $('<div>' + (i+1) + '</div>');
            }
            $li.append($anchortag);
        }

    $("button").click(function() {
        //empty the list at the bottom to create a new one
        $(".pagination ul").empty();
        //store the value of the input search into a variable
        inputValue = $("input").val().toLowerCase();
        console.log(inputValue);
        //filter the list items by the input value and add CSS
        $StudentsToHide = $('.student-item h3').filter(function(index) {
            if($(this).text().indexOf(inputValue) == -1) {
             return true;
         }
         //Hide anything that does not match the list items shown
         }).each(function() {
            $(this).parent().parent().hide();

         });
         //show the correct students
         $StudentsToShow = $('.student-item h3').filter(function(index) {
            if($(this).text().indexOf(inputValue) >= 0) {
                return true;
            }
         }).each(function(){
            $(this).parent().parent().show();

         });

         $StudentsToShow.each(function(index) {
        var $StudentParent = $(this).parents('.student-item');
        if (index < 10) {
            $StudentParent.show();
        } else {
            $StudentParent.hide();
        }
    });
         //appends li items to the bottom
         for (var i = 0; i < Math.ceil($StudentsToShow.length / 10); i++) {
            
            var $anchortag;
            var $li = $('<li></li>');
            $(".page-numbers").append($li);

            if (i === 0) {
                $anchortag = $('<div class="active">' + (i+1) + '</div>');
            } else {
                $anchortag = $('<div>' + (i+1) + '</div>');
            }
            $li.append($anchortag);
        }
        //calls NewPage function within the button click function
        $('.page-numbers div').click(NewPage);
         
    });

//Create an event handler for clicking a page number 
$(".page-numbers div").click(NewPage);

//Function for changing pages and changing the active class on the links
function NewPage() {

//remove active class from page links
$('.page-numbers div').removeClass('active');

//make the pressed page number have the active class
$(this).addClass('active');

//store the page number into a variable so we can use it for indexing
var pageNumber = parseInt($(this).text());

//Show only ten student's according to the page number and hide the others
    $StudentsToShow.each(function(index) {
        var $StudentParent = $(this).parents('.student-item');
        if (index >= (pageNumber-1) * 10 && index < pageNumber * 10) {
            $StudentParent.show();
        } else {
            $StudentParent.hide();
            }
    });

}


}

//********* my recipes controller invoke **
//*****************************************

$scope.recipeClick = function () {
    $location.path('/recipes');
}



});	//end controller
})(); //end self invoked function
/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(\w+)\b/i,t=0,n=_self.Prism={manual:_self.Prism&&_self.Prism.manual,util:{encode:function(e){return e instanceof a?new a(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e){var t=n.util.type(e);switch(t){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=n.util.clone(e[r]));return a;case"Array":return e.map&&e.map(function(e){return n.util.clone(e)})}return e}},languages:{extend:function(e,t){var a=n.util.clone(n.languages[e]);for(var r in t)a[r]=t[r];return a},insertBefore:function(e,t,a,r){r=r||n.languages;var l=r[e];if(2==arguments.length){a=arguments[1];for(var i in a)a.hasOwnProperty(i)&&(l[i]=a[i]);return l}var o={};for(var s in l)if(l.hasOwnProperty(s)){if(s==t)for(var i in a)a.hasOwnProperty(i)&&(o[i]=a[i]);o[s]=l[s]}return n.languages.DFS(n.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,t,a,r){r=r||{};for(var l in e)e.hasOwnProperty(l)&&(t.call(e,l,e[l],a||l),"Object"!==n.util.type(e[l])||r[n.util.objId(e[l])]?"Array"!==n.util.type(e[l])||r[n.util.objId(e[l])]||(r[n.util.objId(e[l])]=!0,n.languages.DFS(e[l],t,l,r)):(r[n.util.objId(e[l])]=!0,n.languages.DFS(e[l],t,null,r)))}},plugins:{},highlightAll:function(e,t){var a={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var r,l=a.elements||document.querySelectorAll(a.selector),i=0;r=l[i++];)n.highlightElement(r,e===!0,a.callback)},highlightElement:function(t,a,r){for(var l,i,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(l=(o.className.match(e)||[,""])[1].toLowerCase(),i=n.languages[l]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+l);var s=t.textContent,u={element:t,language:l,grammar:i,code:s};if(n.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return u.code&&(u.element.textContent=u.code),n.hooks.run("complete",u),void 0;if(n.hooks.run("before-highlight",u),a&&_self.Worker){var g=new Worker(n.filename);g.onmessage=function(e){u.highlightedCode=e.data,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},g.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=n.highlight(u.code,u.grammar,u.language),n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(t),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},highlight:function(e,t,r){var l=n.tokenize(e,t);return a.stringify(n.util.encode(l),r)},tokenize:function(e,t){var a=n.Token,r=[e],l=t.rest;if(l){for(var i in l)t[i]=l[i];delete t.rest}e:for(var i in t)if(t.hasOwnProperty(i)&&t[i]){var o=t[i];o="Array"===n.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var u=o[s],g=u.inside,c=!!u.lookbehind,h=!!u.greedy,f=0,d=u.alias;if(h&&!u.pattern.global){var p=u.pattern.toString().match(/[imuy]*$/)[0];u.pattern=RegExp(u.pattern.source,p+"g")}u=u.pattern||u;for(var m=0,y=0;m<r.length;y+=r[m].length,++m){var v=r[m];if(r.length>e.length)break e;if(!(v instanceof a)){u.lastIndex=0;var b=u.exec(v),k=1;if(!b&&h&&m!=r.length-1){if(u.lastIndex=y,b=u.exec(e),!b)break;for(var w=b.index+(c?b[1].length:0),_=b.index+b[0].length,P=m,A=y,j=r.length;j>P&&_>A;++P)A+=r[P].length,w>=A&&(++m,y=A);if(r[m]instanceof a||r[P-1].greedy)continue;k=P-m,v=e.slice(y,A),b.index-=y}if(b){c&&(f=b[1].length);var w=b.index+f,b=b[0].slice(f),_=w+b.length,x=v.slice(0,w),O=v.slice(_),S=[m,k];x&&S.push(x);var N=new a(i,g?n.tokenize(b,g):b,d,b,h);S.push(N),O&&S.push(O),Array.prototype.splice.apply(r,S)}}}}}return r},hooks:{all:{},add:function(e,t){var a=n.hooks.all;a[e]=a[e]||[],a[e].push(t)},run:function(e,t){var a=n.hooks.all[e];if(a&&a.length)for(var r,l=0;r=a[l++];)r(t)}}},a=n.Token=function(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length,this.greedy=!!r};if(a.stringify=function(e,t,r){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(n){return a.stringify(n,t,e)}).join("");var l={type:e.type,content:a.stringify(e.content,t,r),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:r};if("comment"==l.type&&(l.attributes.spellcheck="true"),e.alias){var i="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(l.classes,i)}n.hooks.run("wrap",l);var o=Object.keys(l.attributes).map(function(e){return e+'="'+(l.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+l.tag+' class="'+l.classes.join(" ")+'"'+(o?" "+o:"")+">"+l.content+"</"+l.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var t=JSON.parse(e.data),a=t.language,r=t.code,l=t.immediateClose;_self.postMessage(n.highlight(r,n.languages[a],a)),l&&_self.close()},!1),_self.Prism):_self.Prism;var r=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return r&&(n.filename=r.src,!document.addEventListener||n.manual||r.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(n.highlightAll):window.setTimeout(n.highlightAll,16):document.addEventListener("DOMContentLoaded",n.highlightAll))),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/i,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:{pattern:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\\\|\\?[^\\])*?`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript"}}),Prism.languages.js=Prism.languages.javascript;

//List of quotes for the random quotes generator, linked to the main html page.

var quotes = [
{
                quote: "Some people don't like change, but you need to embrace change if the alternative is disaster.",
                source: "Elon Musk"
     
},
{
                quote: "Knowledge, like air, is vital to life. Like air, no one should be denied it.",
                source: "Alan Moore",
                citation: "V for Vendetta",
                year: "1982"
                
},
{
                quote: "Reality is Wrong. Dreams are for real.",
                source: "Tupac Shakur"

},                
{
                quote: "Push yourself again and again.  Don't give an inch until the final buzzer sounds.",
                source: "Larry Bird"
},
{
                quote: "Believing takes practice.",
                source: "Madeleine L'engle",
                citation: "A Wrinkle In Time",
                year: "1963"

}                
];
(function(){
'use strict'



//initialize the angular module
angular.module('app')
.controller('quotesController', function($scope, $location){

$scope.$location = $location;

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


});	//end controller
})(); //end self invoked function
(function(){
'use strict'

//initialize the angular module
angular.module('app')
.controller('RecipeDetailController',['$scope', 'dataService', '$location', '$routeParams', '$log', function($scope, dataService, $location, $routeParams, $log){



//set the location on the scope.
$scope.location = $location;

//get all categories for the select category dropdown
dataService.getCategories(function(response){
	$scope.categories = response.data;
	console.log(response.data);
});

//set the current path on the scope.
	$scope.path = $location.path().split('/')[2];
    console.log($scope.path);



//get recipes
	dataService.getRecipes(function(response){
	$scope.recipes = response.data;


});

 
//see if there is a recipe in the path, if so request the ID and set the recipe on the scope to equal the response data
if ($scope.path) {

	console.log("yes there is a path");

	dataService.getRecipesId($scope.path, function(response){
	console.log("this is the get recipe id data:" + response.data);
	$scope.recipe = response.data;

}); //end dataService.getRecipesID

} else {
// otherwise create an empty recipe object on the scope to edit
	$scope.recipe = {
		name: "",
		description: "",
		category: "",
		prepTime: 0,
		cookTime: 0,
		ingredients: [],
		steps: []
	} //end $scope.recipe

	console.log("no path exists!");

} //end else
	

//function to update recipe upon saving
$scope.updateRecipe = function() {

//if we are editing, use put to update the data.
if($scope.path){

	dataService.putID($scope.recipe._id, $scope.recipe, function(response){

		$scope.recipe = response.data;
		$location.url('/recipes');

	}, function(error){
		if (error) {$scope.showError = true}
		$log.error(error.data.errors);
		//add name errors to the scope to show specific errors related to the name field
		$scope.nameErrors = error.data.errors.name;
		//add ingredient errors to the scope to show specific errors related to adding ingredients.
		$scope.ingredientErrors = error.data.errors.ingredients;
		//add category errors to the scope to show specific errors related to category selection.
		$scope.categoryErrors = error.data.errors.categories;
		//add steps errors to the scope to show specific errors related to adding new steps.
		$scope.stepErrors = error.data.errors.steps;


	}); //end dataService.putID


} else {
   
   //otherwise add new recipe
   dataService.addRecipe($scope.recipe, function(response){
        
        //go back to the home page after adding the recipe 
        $location.url('/recipes');

}, function(error){
		if (error) {$scope.showError = true}
		$log.error(error.data.errors);
		//add name errors to the scope to show specific errors related to the name field
		$scope.nameErrors = error.data.errors.name;
		//add ingredient errors to the scope to show specific errors related to adding ingredients.
		$scope.ingredientErrors = error.data.errors.ingredients;
		//add category errors to the scope to show specific errors related to category selection.
		$scope.categoryErrors = error.data.errors.categories;
		//add steps errors to the scope to show specific errors related to adding new steps.
		$scope.stepErrors = error.data.errors.steps;

   }); //end dataService.addRecipe

} //end else

	}; //end scope.updateRecipe



//add a cancel function to the scope to cancel adding/editing a recipe
$scope.cancel = function() {
  		$location.url('/recipes');
}

//set foodItems on the scope
dataService.getFoodItems(function(response){
	console.log(response.data);
	$scope.foodItems = response.data;

});


//function to delete recipe steps
$scope.deleteRecipeStep = function($index) {
	console.log("this many steps: " + $scope.recipe.steps);
	$scope.recipe.steps.splice($index, 1);
	
}

//function to add recipe steps 
$scope.addRecipeStep = function() {


//push new object into the recipe steps array, set key value pairs to a description with an empty string.
	$scope.recipe.steps.push(

		//push object with empty string as description in key value pair
	{
		"description": ""
	}

	); //end recipe.steps.push

	console.log($scope.recipe.steps);

} //end addRecipeStep

//function to delete an ingredient
$scope.deleteRecipeIngredient = function($index) {
	$scope.recipe.ingredients.splice($index, 1);

}

//function to add a new ingredient
$scope.addIngredient = function() {

	//push an ingredients object into the scope ingredients.
	$scope.recipe.ingredients.push(

 	{
 		"foodItem": "",
 		"condition": "",
 		"amount": ""
 	}


		);

} //end addIngredient


}]); //end controller
})(); //end self invoked function
(function(){
'use strict'
//start the angular module and create a controller
angular.module('app')
.controller('recipesController', function($scope, dataService, $location){

$scope.$location = $location;

//get recipe data for page load
dataService.getRecipes(function(response){
	console.log(response.data);
	$scope.recipes = response.data;
	console.log($scope.recipes.length);

	});//end getRecipes

// get all the categories for listing purposes
dataService.getCategories(function(response){
	console.log("This is the categories array: " + response.data);
	$scope.categories = response.data;

	}); //end getCategories

//create the currentCategory property on the scope
$scope.currentCategory = null;

//instantiate the showNoRecipes property 
$scope.showNoRecipes = null;

//create getRecipeCategory on the scope as a function
$scope.getRecipeCategory = function() {

//if the category is all categories set $scope.recipes to equal that data.
		if ($scope.currentCategory === "All Categories") {

	dataService.getRecipes(function(response){ 
		$scope.recipes = response.data;



	}); //end dataService.getRecipes
		

	} else {




//bind $scope.currentCategory as a parameter, select ng-model will use this to update this parameter via data binding.
dataService.getRecipesCategory($scope.currentCategory, function(response){

	console.log(response.data);
 	$scope.recipes = response.data;
 	console.log("This is the category: " + $scope.currentCategory);

//create function that checks if $scope.recipes has recipes, if it does hide the div
//may have to place this inside the function above to access the scope.recipes information.
	if ($scope.recipes.length <= 0) {
		//console.log for testing purposes
		console.log("Recipes has No Length")
		$scope.showNoRecipes = true;
	} else {
		//console.log for testing purposes
		console.log("Recipes length is: " + $scope.recipes.length)
		$scope.showNoRecipes = false;
	} //end else

});

} //end else

	}; //end getRecipeCategory function


//function to delete recipes

$scope.deleteRecipe = function($index) {
	dataService.deleteRecipe($scope.recipes[$index]._id, function(){
		//call the getRecipes dataService and refresh the recipes on the scope.
		dataService.getRecipes(function(response){
			$scope.recipes = response.data;


		}); //end dataService.getRecipes


	}); //end dataService.deleteRecipe
} //end scope.deleteRecipe

//create a recipe object to add with the addrecipe dataService










}); //end recipes controller
})(); //end self invoked function
(function(){
'use strict'

//initialize the angular module
angular.module('app')
.controller('skillsController', function($scope, $location){


var logos = document.getElementsByClassName("ratingfade");

//create bee logo manipulation arrays for each skill section
var angularlogos = [];
var htmllogos = [];
var csslogos = [];
var jslogos = [];

// push the logos into their own arrays for specific manipulation
function pushlogos(logos){
		for (var i = 0; i < 5 ; i++) {
			angularlogos.push(logos[i]);
		}
		for (var i = 5; i < 10; i++) {
			htmllogos.push(logos[i]);
		}
		for (var i = 10; i < 15; i++) {
			csslogos.push(logos[i]);
		}
		for (var i = 15; i < 20; i++) {
			jslogos.push(logos[i]);
		}
} //end pushlogos

//push all of the logos we get from the page
pushlogos(logos);
console.log(angularlogos);
console.log(angularlogos[0]);

//function to call prismjs to highlight all code inside prism code blocks
$scope.$on('$viewContentLoaded', function(){
    Prism.highlightAll();
});

$scope.$location = $location;

console.log("skills controller is going");

$scope.htmlClick = function() {

	var htmlCodeLink = document.getElementById("htmlCodeLink")
	var htmlCode = document.getElementById("htmlcode");
	//remove in from the htmlcode id when the logo is clicked to hide any open code if the html section is toggled 
	//without toggling live codde link

	htmlCode.classList.remove("in");
	htmlCodeLink.classList.add("collapsed");

}

$scope.angularClick = function() {

	var angularCodeLink = document.getElementById("angularCodeLink")
	var angularCode = document.getElementById("angularcode");
	//remove in from the htmlcode id when the logo is clicked to hide any open code if the html section is toggled 
	//without toggling live codde link

	angularcode.classList.remove("in");
	angularCodeLink.classList.add("collapsed");

}

$scope.cssClick = function() {

	var cssCodeLink = document.getElementById("cssCodeLink")
	var cssCode = document.getElementById("css3code");
	//remove in from the htmlcode id when the logo is clicked to hide any open code if the html section is toggled 
	//without toggling live codde link

	cssCode.classList.remove("in");
	cssCodeLink.classList.add("collapsed");

}

$scope.jsClick = function() {

	var jsCodeLink = document.getElementById("nodeCodeLink")
	var jsCode = document.getElementById("nodecode");
	//remove in from the htmlcode id when the logo is clicked to hide any open code if the html section is toggled 
	//without toggling live codde link

	jsCode.classList.remove("in");
	jsCodeLink.classList.add("collapsed");

}


});	//end controller
})(); //end self invoked function
