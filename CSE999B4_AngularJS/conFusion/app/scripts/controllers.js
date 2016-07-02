'use strict';

angular.module('confusionApp')
	.controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
		// Specifying Dishes for Menu
		/*
		var dishes = [
			{
				name: 'Uthapizza',
				image: 'images/uthapizza.png',
				category: 'mains',
				label: 'Hot',
				price: '4.99',
				description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
				comment: ''
			},
			{
				name: 'Zucchipakoda',
				image: 'images/zucchipakoda.png',
				category: 'appetizer',
				label: '',
				price: '1.99',
				description: 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
				comment: ''
			},
			{
				name: 'Vadonut',
				image: 'images/vadonut.png',
				category: 'appetizer',
				label: 'New',
				price: '1.99',
				description: 'A quintessential ConFusion experience, is it a vada or is it a donut?',
				comment: ''
			},
			{
				name: 'ElaiCheese Cake',
				image: 'images/elaicheesecake.png',
				category: 'dessert',
				label: '',
				price: '2.99',
				description: 'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
				comment: ''
			}
		]; 
		*/

		// Using static data in menuFactory
		//		$scope.dishes = menuFactory.getDishes();

		// Using $http in menuFactory
		/*
		$scope.showMenu = false;
		$scope.message = "Loading ...";
		$scope.dishes = {};
		menuFactory.getDishes()
			.then(
				function (response) {
					$scope.dishes = response.data;
					$scope.showMenu = true;
				},
				function (response) {
					$scope.message = "Error: " + response.status + " " + response.statusText;
				}
			);
		*/

		// Using $resource in menuFactory
		$scope.showMenu = false;
		$scope.message = "Loading ...";
		menuFactory.getDishes().query(
			function (response) {
				$scope.dishes = response;
				$scope.showMenu = true;
			},
			function (response) {
				$scope.message = "Error: " + response.status + " " + response.statusText;
			});

		// Tab Control
		var tab = 1;
		$scope.filtText = "";
		$scope.select = function (setTab) {
			tab = setTab;
			if (setTab === 2) {
				$scope.filtText = "appetizer";
			} else if (setTab === 3) {
				$scope.filtText = "mains";
			} else if (setTab === 4) {
				$scope.filtText = "dessert";
			} else {
				$scope.filtText = "";
			}
		};
		$scope.isSelected = function (checkTab) {
			return (tab === checkTab);
		};
		$scope.toggleDetails = function () {
			$scope.showDetails = !$scope.showDetails;
		};
	}])
	.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
		// Specifying a Dish
		/*
		var dish = {
			name: 'Uthapizza',
			image: 'images/uthapizza.png',
			category: 'mains',
			label: 'Hot',
			price: '4.99',
			description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
			comments: [
				{
					rating: 5,
					comment: "Imagine all the eatables, living in conFusion!",
					author: "John Lemon",
					date: "2012-10-16T17:57:28.556094Z"
				},
				{
					rating: 4,
					comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
					author: "Paul McVites",
					date: "2014-09-05T17:57:28.556094Z"
				},
				{
					rating: 3,
					comment: "Eat it, just eat it!",
					author: "Michael Jaikishan",
					date: "2015-02-13T17:57:28.556094Z"
				},
				{
					rating: 4,
					comment: "Ultimate, Reaching for the stars!",
					author: "Ringo Starry",
					date: "2013-12-02T17:57:28.556094Z"
				},
				{
					rating: 2,
					comment: "It's your birthday, we're gonna party!",
					author: "25 Cent",
					date: "2011-12-02T17:57:28.556094Z"
				}
			]
		};
		*/

		// Using static data in menuFactory 
		//		$scope.dish = menuFactory.getDish(parseInt($routeParams.id, 10));
		//		$scope.dish = menuFactory.getDish(parseInt($stateParams.id, 10));

		// Using $http in menuFactory
		/*
		$scope.dish = {};
		$scope.showDish = false;
		$scope.message = "Loading ...";
		menuFactory.getDish(parseInt($stateParams.id, 10))
			.then(
				function (response) {
					$scope.dish = response.data;
					$scope.showDish = true;
				},
				function (response) {
					$scope.message = "Error: " + response.status + " " + response.statusText;
				}
			);
		*/

		// Using $resource in menuFactory
		$scope.showDish = false;
		$scope.message = "Loading ...";
		$scope.dish = menuFactory.getDishes().get({
				id: parseInt($stateParams.id, 10)
			})
			.$promise
			.then(
				function (response) {
					$scope.dish = response;
					$scope.showDish = true;
				},
				function (response) {
					$scope.message = "Error: " + response.status + " " + response.statusText;
				}
			);
	}])
	.controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
		// Bind User Comment
		$scope.userComment = {
			author: "",
			rating: 5,
			comment: "",
			date: null
		};

		$scope.submitComment = function () {
			$scope.userComment.date = new Date().toISOString();
			$scope.dish.comments.push($scope.userComment);
			menuFactory.getDishes().update({
				id: $scope.dish.id
			}, $scope.dish);

			$scope.commentForm.$setPristine();

			$scope.userComment = {
				author: "",
				rating: 5,
				comment: "",
				date: null
			};
		};
	}])
	.controller('ContactController', ['$scope', function ($scope) {
		$scope.feedback = {
			mychannel: "",
			firstName: "",
			lastName: "",
			agree: false,
			email: ""
		};
		var channels = [{
			value: "tel",
			label: "Tel."
		}, {
			value: "Email",
			label: "Email"
		}];
		$scope.channels = channels;
		$scope.invalidChannelSelection = false;
	}])
	.controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {
		$scope.sendFeedback = function () {
			console.log($scope.feedback);
			if ($scope.feedback.agree && ($scope.feedback.mychannel == "") && !$scope.feedback.mychannel) {

				$scope.invalidChannelSelection = true;
				console.log('incorrect');
			} else {
				$scope.invalidChannelSelection = false;
				feedbackFactory.getFeedbacks().save($scope.feedback);

				$scope.feedback = {
					mychannel: "",
					firstName: "",
					lastName: "",
					agree: false,
					email: ""
				};
				$scope.feedback.mychannel = "";

				$scope.feedbackForm.$setPristine();
				console.log($scope.feedback);
			}
		};
	}])
	.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
		// Choosing featured dish as the first dish in "dishes" array.
		//		$scope.featuredDish = menuFactory.getDish(0);

		// Using $http in menuFactory
		/*
		$scope.featuredDish = {};
		$scope.showDish = false;
		$scope.message = "Loading ...";
		menuFactory.getDish(0)
			.then(
				function (response) {
					$scope.featuredDish = response.data;
					$scope.showDish = true;
				},
				function (response) {
					$scope.message = "Error: " + response.status + " " + response.statusText;
				}
			);
		*/

		// Using $resource in menuFactory
		$scope.showDish = false;
		$scope.dishMessage = "Loading ...";
		$scope.featuredDish = menuFactory.getDishes().get({
				id: 0
			})
			.$promise
			.then(
				function (response) {
					$scope.featuredDish = response;
					$scope.showDish = true;
				},
				function (response) {
					$scope.dishMessage = "Error: " + response.status + " " + response.statusText;
				}
			);

		// Choosing featured promotion as the first promotion in "promotions" array.
		$scope.showPromotion = false;
		$scope.promotionMessage = "Loading ...";
		$scope.featuredPromotion = menuFactory.getPromotion().get({
				id: 0
			})
			.$promise
			.then(
				function (response) {
					$scope.featuredPromotion = response;
					$scope.showPromotion = true;
				},
				function (response) {
					$scope.promotionMessage = "Error: " + response.status + " " + response.statusText;
				}
			);

		// Directly choosing the leader with designation 'Executive Chef' in "leadership array.
		//		$scope.executiveChef = corporateFactory.getLeader(3);

		$scope.showLeader = false;
		$scope.leaderMessage = "Loading ...";
		$scope.executiveChef = corporateFactory.getLeaders().get({
				id: 3
			})
			.$promise
			.then(
				function (response) {
					$scope.executiveChef = response;
					$scope.showLeader = true;
				},
				function (response) {
					$scope.leaderMessage = "Error: " + response.status + " " + response.statusText;
				}
			);
	}])
	.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
		$scope.showLeader = false;
		$scope.leaderMessage = "Loading ...";
		$scope.leadership = corporateFactory.getLeaders()
			.query(
				function (response) {
					$scope.leadership = response;
					$scope.showLeader = true;
				},
				function (response) {
					$scope.leaderMessage = "Error: " + response.status + " " + response.statusText;
				}
			);
	}]);