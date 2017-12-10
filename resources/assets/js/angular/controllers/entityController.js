angular.module('botApp').controller("entityController", function ($rootScope, $scope, $http, $parse, shrinkLoading) {
    $scope.newEntityTrigger = function(){
        $scope.showCreateEntity = !$scope.showCreateEntity;
    }

    $scope.toggleInit = function(){
        $scope.getAllEntities();
    };

    $scope.getAllEntities = function (){
        var req = {
            method: 'GET',
            url: defaultURL + '/get-all-entities',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
        };

        $http(req).then(function (data) {


            $scope.allEntities = data.data;

        }).catch(function (data) {

        });
    }
    $scope.entityChange = function(){
        $scope.getAllValuesEntity($scope.selectedEntity);
    }

    $scope.getAllValuesEntity = function(entity){
        var req = {
            method: 'POST',
            url: defaultURL + '/get-all-values-entity',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
               entity : entity
            }
        };

        $http(req).then(function (data) {
            console.log(data);
          //  $scope.entityData = data.data;
            if(data.status == 200){
                $scope.entityData =$scope.removeDoubleValuesInSynonims(data.data);

            }

        }).catch(function (data) {

        });
    };

    $scope.addSynonym = function(data, expressionModel, entityData){
        var entity = entityData.name;
    }
    $scope.removeDoubleValuesInSynonims = function(entityData){
        var newData = entityData;
        for(var i = 0; i< newData.values.length; i++){
            if(newData.values[i]){
                var doubleValue = newData.values[i].expressions.indexOf(newData.values[i].value);

                if(doubleValue > -1){
                    newData.values[i].expressions.splice(doubleValue, 1);
                }
            }
        }

        return newData;
    }
});