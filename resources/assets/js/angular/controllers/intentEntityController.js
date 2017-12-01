angular.module('botApp').controller("intentEntityController", function ($rootScope, $scope, $http, $parse, shrinkLoading, $compile) {

    $scope.initEntity = function(){



    };

    $scope.showEnitityPopup = function (toggle) {

        if (toggle == 'open') {
            $('.fast-entity-popup').addClass('soft-show');

            $scope.popupIsOpen = true;
        } else if (toggle == 'close') {
            $('.fast-entity-popup').removeClass('soft-show');
            $scope.popupIsOpen = false;
            $scope.removeWhenNotAccepted();
        }
    };

    $scope.saveEntity = function(){

        $scope.selectedEntity = $( ".entity-select option:selected" ).text();


        if($scope.selectedEntity){


        var element =  $scope.currentSpan;
        $scope.entityName =  $scope.selectedEntity;
        $(element).attr('data-entity-name', $scope.entityName);
        $scope.toggleEntityPopup({toggle: 'close'});
        }else{
            console.log('error');
        }
    }
    $scope.toggleEntityPopup = function (data) {
        $scope.selectedEntity = null;


        if (data.toggle == 'open') {
            if (!$scope.popupIsOpen) {
                $scope.showEnitityPopup('open');

            } else {
                $scope.removeWhenNotAccepted();
            }
            $scope.getAllEntities();



            $scope.entityName = data.entity;
            $scope.entityValue = data.value;
            $scope.currentSpan = data.element;
            $($('.fast-entity-popup')).offset({
                top: data.top,
                left: data.left
            });

        } else if (data.toggle == 'close') {
            $scope.showEnitityPopup('close');
            /* $scope.showFastEntity = false;*/
            $scope.entityName = null;
            $scope.entityValue = null;
            if (!$scope.$$phase) {
                $scope.$apply();
            }

        }

    };

    $scope.removeWhenNotAccepted = function () {
        if (typeof $scope.entityName == 'undefined' || $scope.entityName == '') {
            var element = $scope.currentSpan;
            $(element).contents().unwrap();
        }

    }
    $scope.deleteEntity = function () {

        var element = $scope.currentSpan;
        $(element).contents().unwrap();
        $scope.showEnitityPopup('close');
    }


    $scope.getAllEntities = function (){
        var req = {
            method: 'GET',
            url: '../../get-all-entities',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
        };

        $http(req).then(function (data) {

            //console.log(data);

            $scope.allEntities = data.data;

        }).catch(function (data) {

        });
    }
});


$(document).ready(function() {
    $('.entity-select').select2();
});