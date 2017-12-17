/**
 * Created by Rowan on 11-11-2017.
 */
angular.module('botApp').controller("navController", function ($scope, $http, $parse) {

    /*  $scope.changeActiveApp = function(){
     console.log('broadcasted to navcontroller');
     }*/
    $scope.navInit = function(){
        $scope.checkActiveApp();
        $scope.createBreadCrumbs();
    }
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
            $scope.createBreadCrumbs();



        }).catch(function (data) {


        });
    }

    $scope.changeActiveApp = function(data){
        console.log(data);

        $scope.activeApp = data.title;
    }

    $scope.createBreadCrumbs = function(){
        $scope.rawBreadCrumbs = currentPath.split('/');

        $scope.breadCrumbs = [];
        var rawRenderedCrumbs = [];
        for(var i = 0; i < $scope.rawBreadCrumbs.length ; i++){
            rawRenderedCrumbs.push($scope.rawBreadCrumbs[i]);
            var currentCrumb = rawRenderedCrumbs;
            console.log($scope.rawBreadCrumbs[i]);
            $scope.breadCrumbs.push(
                {
                    href: defaultURL + '/' + currentCrumb.join('/'),
                    text: $scope.rawBreadCrumbs[i]
                }

            );

            if($scope.rawBreadCrumbs[i].toLowerCase() == 'dashboard'){
                if(typeof $scope.activeApp != 'undefined'){
                    $scope.breadCrumbs.push(
                        {
                            href: defaultURL + '/' + currentCrumb.join('/'),
                            text: $scope.activeApp
                        }

                    );
                }
            }
        }
        console.log($scope.breadCrumbs);
        console.log($scope.activeApp);
    }

});