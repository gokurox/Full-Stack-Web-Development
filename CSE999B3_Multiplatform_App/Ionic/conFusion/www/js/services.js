'use strict';

angular.module('conFusion.services', ['ngResource'])
	// Using localhost just for submission purposes. Please change to your machine's IP address
//	.constant ("baseURL", "http://localhost:3000/")
	.constant ("baseURL", "http://192.168.1.182:3000/")

// Added instead of menuFactory service
	.factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
		return $resource(baseURL + "dishes/:id", null, {
			'update': {
				method: 'PUT'
			}
		});
	}])

	.factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
		return $resource(baseURL + "promotions/:id");
	}])

/*
	.service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {

		var promotions = [
			{
				_id:0,
				name:'Weekend Grand Buffet', 
				image: 'images/buffet.png',
				label:'New',
				price:'19.99',
				description:'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person ',
			}
		];

		this.getDishes = function(){
			return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
		};

		// implement a function named getPromotion that returns a selected promotion.
		this.getPromotion = function() {
			return   $resource(baseURL+"promotions/:id");;
		}
	}])
	*/

// Updating corporateFactory
// Method 1: Make corporateFactory as a service rather than a factory. (Copying from menuFactory).
/*
	.service ('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
		this.getLeaders = function(){
			return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
		};
	}])
	*/

// Implementation as a factory
	.factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {

		/* 
		 * Method 2: Return an Object with these two properties (only one may be used as both are equivalent for this purpose)
		 *			 Use as (select by ID): corporateFactory.getAll().get({id:x});
		 *									corporateFactory.getID().get({id:x});
		 *			 Use as (select all): corporateFactory.getAll().query (function (response) {$scope.something = response});
		 *								  corporateFactory.getID().query (function (response) {$scope.something = response});
		 *					 
		 */

		/*
		return {
			getAll: function() {
				return $resource (baseURL + "leadership/:id", null, {'update':{method:'PUT' }});
			},
			getID : function() {
				return $resource (baseURL + "leadership/:id");
			}
		};
		*/

		// Method 3: Return directly the resource Object (as both properties were equivalent above)
		return $resource (baseURL + "leadership/:id");
	}])

	.factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
		return $resource (baseURL + "feedback/:id");
	}])

	.factory('favoriteFactory', ['$resource', 'baseURL', '$localStorage', function ($resource, baseURL, $localStorage) {
		var favFac = $localStorage.getObject ('userFavorites', '{}');
		
		if (!favFac.favorites)
			favFac.favorites = [];

		favFac.addToFavorites = function (index) {
			for (var i = 0; i < favFac.favorites.length; i++) {
				if (favFac.favorites[i].id == index)
					return;
			}
			favFac.favorites.push ({id: index});
			$localStorage.storeObject ('userFavorites', favFac);
		};

		favFac.deleteFromFavorites = function (index) {
			for (var i = 0; i < favFac.favorites.length; i++) {
				if (favFac.favorites[i].id == index) {
					favFac.favorites.splice(i, 1);
				}
			}
			$localStorage.storeObject ('userFavorites', favFac);
		}

		favFac.getFavorites = function () {
			return favFac.favorites;
		};

		return favFac;
	}])

	.factory('$localStorage', ['$window', function($window) {
		return {
			store: function(key, value) {
				$window.localStorage[key] = value;
			},
			get: function(key, defaultValue) {
				if ($window.localStorage[key])
					return $window.localStorage[key];
				else
					return defaultValue;
			},
			storeObject: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			getObject: function(key,defaultValue) {
				return JSON.parse($window.localStorage[key] || defaultValue);
			}
		}
	}])
;

