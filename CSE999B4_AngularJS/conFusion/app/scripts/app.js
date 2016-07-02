'use strict';

// Using ui-router
angular.module('confusionApp', ['ui.router', 'ngResource'])
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('app', {
				url: '/',
				views: {
					'header': {
						templateUrl: 'views/header.html'
					},
					'content': {
						templateUrl: 'views/home.html',
						controller: 'IndexController'
					},
					'footer': {
						templateUrl: 'views/footer.html'
					}
				}
			})
			.state('app.aboutus', {
				url: 'aboutus',
				views: {
					'content@': {
						templateUrl: 'views/aboutus.html',
						controller: 'AboutController'
					}
				}
			})
			.state('app.contactus', {
				url: 'contactus',
				views: {
					'content@': {
						templateUrl: 'views/contactus.html',
						controller: 'ContactController'
					}
				}
			})
			.state('app.menu', {
				url: 'menu',
				views: {
					'content@': {
						templateUrl: 'views/menu.html',
						controller: 'MenuController'
					}
				}
			})
			.state('app.dishdetails', {
				url: 'menu/:id',
				views: {
					'content@': {
						templateUrl: 'views/dishdetail.html',
						controller: 'DishDetailController'
					}
				}
			});
		$urlRouterProvider.otherwise('/');
	});

// Using ngRoute
/*
angular.module('confusionApp', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
		// route for the contactus page
			.when('/contactus', {
				templateUrl: 'contactus.html',
				controller: 'ContactController'
			})
			// route for the menu page
			.when('/menu', {
				templateUrl: 'menu.html',
				controller: 'MenuController'
			})
			// route for the dish details page
			.when('/menu/:id', {
				templateUrl: 'dishdetail.html',
				controller: 'DishDetailController'
			})
			.otherwise('/contactus');
	});
*/