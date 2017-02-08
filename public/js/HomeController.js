(function(){
'use strict'

//initialize the angular module
angular.module('app')
.controller('mainController', function($scope, $location){

//set location to equal $location for data binding on the template
$scope.$location = $location;

//add a function to skills that changes the path to the skills template once triggered
$scope.skills = function() {

	$location.path('/skills');
} 
//add a function to contact that changes the path to the contact template once triggered
$scope.contact = function() {

	$location.path('/contact');

}
//add a function to quotes that changes the path to the quotes template once triggered
$scope.quotes = function() {

	$location.path('/quotes');

}




});	//end controller
})(); //end self invoked function