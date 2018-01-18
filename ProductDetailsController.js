var myProducts = angular.module("myProducts", []);

myProducts.controller('ProductDetailsController', function ($scope,$filter,$http,$stateParams) {
  // var vm = this;
    //$http({
    //    url: "Products.json",
    //    method: "get",
    //    params: { id: $stateParams.id }
    //}).then(function (response) {
    //    console.log(response.data);
    //    $scope.productdata = response.data;        
    //});  
    $http.get('Products.json')
       .then(function (response) {
           $scope.productdata = $filter('filter')(response.data, { id: $stateParams.id })[0]
           console.log(response.data);
           console.log($scope.productdata);
       });
});

