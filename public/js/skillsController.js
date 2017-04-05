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
