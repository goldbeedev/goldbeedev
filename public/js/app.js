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