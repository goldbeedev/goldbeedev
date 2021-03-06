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