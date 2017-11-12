/**
 * Created by Rowan on 11-11-2017.
 */
angular.module('botApp').controller("navController", function ($scope, $http, $parse) {

    /*  $scope.changeActiveApp = function(){
     console.log('broadcasted to navcontroller');
     }*/
    $scope.checkActiveApp = function(){
        var req = {
            method: 'GET',
            url: ajaxAppSessionURL,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            }

        };

        $http(req).then(function (data) {
            console.log( 'active session ');
            console.log(data);

            $scope.activeApp = data.data.title;




        }).catch(function (data) {


        });
    }

    $scope.changeActiveApp = function(data){
        console.log(data);

        $scope.activeApp = data.title;
    }

});