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