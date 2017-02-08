(function(){
'use strict'

//initialize the angular module
angular.module('app')
.controller('skillsController', function($scope, $location){

$scope.$location = $location;

console.log("skills controller is going");


});	//end controller
})(); //end self invoked function
