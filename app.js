var myApp = angular.module("myApp", ['ui.router','myHome','myProducts']);
myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
         .state('Home', {
             url: '/Home',
             templateUrl: 'HomePage.html',
             controller: 'HomePageCtrl'
         })
        .state("ProductDetails", {
            url:"/products/:id",
            templateUrl: "ProductDetails.html",
            controller: "ProductDetailsController"
        }).state("Filtered", {
            url:"/Filtered",
            templateUrl: "FilteredDetails.html",
            controller: "HomePageCtrl"
        });

    $urlRouterProvider.otherwise('/Home');
}]);
