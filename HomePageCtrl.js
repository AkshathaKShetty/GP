var myHome = angular.module("myHome", []);

//Service to get JSON Data
myHome.service('getDataService', function ($http) {
    this.getallproducts = function () {
        return $http.get('Products.json');
    };
});

////Directive for Tile View
//myHome.directive("tileView", function () {
//        return {
//            restrict: 'E',
//            templateUrl: 'TileView.html',
//            scope: {
//                itemInfo:'=itemInfo'
//            }
//        }
//    });

myHome.controller('HomePageCtrl', function ($scope, getDataService) {
    getDataService.getallproducts().then(function (resp) {
        $scope.products = resp.data;
        $scope.count = $scope.products.length;
    });


    $scope.search = function (item) {       
        if ($scope.searchText == undefined) {
            return true;
        }
        else {            
            if (item.name.toLowerCase()
                                 .indexOf($scope.searchText.toLowerCase()) != -1 ||
                        item.cost.toString()
                                 .indexOf($scope.searchText) != -1||
                        item.rating.toString()
                                 .indexOf($scope.searchText) != -1) {
                return true;
            }
        }

        return false;
    };

    ////Checbox Filter
    //$scope.filterval = [];
    //$scope.selectVal = function (val) {
    //    alert("Inside :: "+val);
    //    var index = $scope.filterval.indexOf(val);
    //    alert("Index Value :: "+index)
    //    if (index > -1)
    //        $scope.filterval.splice(index, 1);
    //    else
    //        $scope.filterval.push(val);
    //    console.log("filterval", $scope.filterval);
    //};

    //displayFilter($scope.products, filterval);

});

//myHome.filter('display', function () {
//   return function (products, q) {
//            if (filterval.length == 0) {
//                return products;
//            }
//            console.log("Inside Display filterval", filterval);
//        //    var tempArr = [];
//        //    angular.forEach(products, function (key, val) {
//        //        tempArr.push(key);
//        //    });
//        //    return tempArr.filter(function (value) {
//        //        //function to create filter for dynamic keys 
//        //        function filterValue(parameter) {
//        //            for (var i in value[parameter]) {
//        //                if (filterval.indexOf(value[parameter][i]) != -1) {
//        //                    return true;
//        //                }
//        //            }
//        //        }
//        //        //pass any key you want in your object 
//        //        //If you want your object to be filtered based on either of the key
//        //        if (filterValue('brand') || filterValue('cost')||  filterValue('color')||filterValue('screensize')){
//        //            return true;
//        //        } else return false;
//        //        //If you want your object to be filtered based on both of the key              
//        //        /*          if(filterValue('roles') && filterValue('request_role')) {
//        //                      return true;
//        //                    }
//        //                    else
//        //                      return false; */
//        //    });
//   };
//});

myHome.filter('display', function() {
    return function (items, keyObj) {
        alert("Items :: " + items);
        alert("KeyObj :: " + keyObj);
        console.log("keyObj", keyObj);
        var filterObj = {
            data:items,
            filteredData:[],
            applyFilter: function (obj, key) {
                //alert("Inside Obj :: " + key);
                var fData = [];
                //alert("Length :: " + fData.length);
                if (this.filteredData.length == 0)
                    this.filteredData = this.data;
                if (obj) {
                    
                    var fObj = {};
                    if(angular.isString(obj)){
                        fObj[key] = obj;
                        fData = fData.concat($filter('filter')(this.filteredData,fObj));
                    }else if(angular.isArray(obj)){
                        if(obj.length > 0){	
                            for(var i=0;i<obj.length;i++){
                                if(angular.isString(obj[i])){
                                    fObj[key] = obj[i];
                                    fData = fData.concat($filter('filter')(this.filteredData,fObj));	
                                }
                            }											
                        }										
                    }									
                    if(fData.length > 0){
                        this.filteredData = fData;
                    }
                }
            }
        };
        if(keyObj){
            angular.forEach(keyObj,function(obj,key){
                filterObj.applyFilter(obj,key);
            });			
        }		
        return filterObj.filteredData;
    }
});

myHome.filter('unique', function() {
    return function (collection, keyname) {       
    var output = [], 
    keys = [];
      angular.forEach(collection, function(item) {          
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
          keys.push(key); 
          output.push(item);
          }
      });
      console.log("unique");
      return output;
   };
});























