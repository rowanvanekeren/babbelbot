/**
 * Created by Rowan on 11-11-2017.
 */
angular.module('botApp').controller("navController", function ($scope, $http, $parse) {

  /*  $scope.changeActiveApp = function(){
    console.log('broadcasted to navcontroller');
    }*/


    $scope.changeActiveApp = function(data){
        console.log(data);

        $scope.activeApp = data.title;
    }

});