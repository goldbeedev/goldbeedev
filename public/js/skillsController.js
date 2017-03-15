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



$scope.$location = $location;

console.log("skills controller is going");


});	//end controller
})(); //end self invoked function
