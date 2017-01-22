// include external modules as dep in app
var app = angular.module('TravelKickstart', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {		//home route
                url: '/home',
                templateUrl: '/travels.html',
                controller: 'TravelCtrl',
                resolve: {					// use ui-router resolve to esnure posts are loaded
                    postPromise: ['travelService', function (travelService) {
                        return travelService.getAll();
                    }]
                }
            });
            // .state('posts', {
            //     url: '/posts/{id}',			// id is a route param available to our controller
            //     templateUrl: '/posts.html',
            //     controller: 'PostsCtrl'	,
            //     resolve: {
            //         post: ['$stateParams', 'postsService', function ($stateParams, postsService) {
            //             return postsService.get($stateParams.id);
            //         }]
            //     }
            // });

        $urlRouterProvider.otherwise('home');	// go home if URL encountered not defined
    }
]);


app.factory('travelService', ['$http', function ($http) {

    var o = {
        travels : []
    };

    o.getAll = function () {
           return $http.get('/travels').success(function(data) {
                    angular.copy(data, o.travels);
           })  ;
    };

    o.create = function (travel) {
        return $http.post('/travels', travel).success(function(data) {
           o.travels.push(data);
        });
    };

    return o;

}]);


app.controller('TravelCtrl', [
    '$scope',
    'travelService',
    function($scope, travelService) {
        $scope.test = 'Hello World';

        $scope.travels = travelService.travels;

        $scope.addTravel = function () {
            if (!$scope.body|| $scope.body === '' ||
                !$scope.person || $scope.person === ''   )
            {return; }

            travelService.create({
                body: $scope.body,
                person: $scope.person,
                image: "http://www.w3schools.com/bootstrap/paris.jpg"
            });
            $scope.body = '';
            $scope.person = '';

        };
    }
]);


