// include external modules as dep in app
var app = angular.module('TravelKickstart', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {              // states define each URL route that user puts into browser
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

            // DIDNT WORK, not sure if its because of the postpromise or because they are both in one page
            // and this is the child of the home and we could only have one controller/ factory

            // .state('products', {
            //     url: '/products',
            //     templateUrl: '/products.html',
            //     controller: 'ProductCtrl',
            //     resolve: {					// use ui-router resolve to ensure PRODUCTS are loaded
            //         postPromise: ['productService', function (productService) {
            //             return productService.getAll();
            //         }]
            //     }
            // });

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
        products: [],
        travels : []
    };

    // o.getAll = function () {
    //        return $http.get('/travels').success(function(data) {
    //                 angular.copy(data, o.travels);
    //        })  ;
    // };

    o.getAll = function () {

       $http.get('/travels').success(function(data) {
                angular.copy(data, o.travels);
       })  ;

        // --> since we are trying to connect to SAP Hybris YaaS, we need to include Auth header
        // Auth header value needs to be re-obtained every hour using YaaS API, either manually
        // through the Builder or through some API call to Auth

        $http.get('https://api.yaas.io/hybris/product/v2/angularproject/products', {
            headers: {'Authorization': 'Bearer 021-b0975f56-167a-4984-a559-3e6bcc192ac3'}}).success(function (data) {
            angular.copy(data, o.products);
        });


        return;
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
        $scope.products = travelService.products;

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




/* PRODUCTS service and controller
*
* didnt work because ui-router .state('/products') cannot seem to be found
* maybe because its child of /travels
* or because we could only define one default route
*
* */
//
// app.factory('productService', ['$http'], function($http) {
//
//     // o will be exposed to controllers that injects this service
//
//     var o = {
//         products: []
//     };
//
//     o.getAll = function () {
//         //--> if the REST API is hosted in our Node server
//
//         // return $http.get('/products').success(function(data) {
//         //     angular.copy(data, o.products);
//         // })  ;
//
//         // --> since we are trying to connect to SAP Hybris YaaS, we need to include Auth header
//         return $http.get('https://api.yaas.io/hybris/product/v2/angularproject/products', {
//             headers: {'Authorization': 'Bearer 021-42e4056c-f0f3-42da-94c3-293d32198253'}
//         }).success(function (data) {
//             angular.copy(data, o.products);
//         });
//     };
//
//     return o;
//
// });
//
// // inject service into controller
// app.controller('ProductCtrl', [
//     '$scope',
//     'productService',
//     function($scope, productService ) {
//         $scope.products = productService.products;
//     }
// ]);




