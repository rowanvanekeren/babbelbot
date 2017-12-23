angular.module('botApp').controller("entityController", function ($rootScope, $scope, $http, $parse, shrinkLoading) {
    $scope.newEntityTrigger = function () {
        $scope.showCreateEntity = !$scope.showCreateEntity;
    }

    $scope.toggleInit = function () {
        $scope.getAllEntities();

    };

    $scope.getAllEntities = function () {
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
    $scope.entityChange = function () {
        $scope.getAllValuesEntity($scope.selectedEntity);
    }

    $scope.getAllValuesEntity = function (entity) {
        if(!entity){
            return;
        }
        $scope.entityData = null;
        $scope.loadEntityValues = true;
        var req = {
            method: 'POST',
            url: defaultURL + '/get-all-values-entity',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: entity
            }
        };

        $http(req).then(function (data) {
            if (data.status == 200) {
                $scope.entityData = $scope.removeDoubleValuesInSynonims(data.data);
                $scope.loadEntityValues = false;
            }

        }).catch(function (data) {

        });
    };

    $scope.addSynonym = function (data, entityValue, entityData) {
        var lookups = entityData.lookups;



      /*  if (lookups.indexOf('keywords') > -1) {*/
            $scope.addKeywordSynonym(entityData.name, entityValue.value, data.text, entityValue);
      /*  }*/
    };

    $scope.toggleDeleteEntityValue = function(value, index){
       $scope.showDeleteEntityValue = true;
       $scope.deleteValue = value;
        $scope.deleteValueIndex = index;
    };

    $scope.deleteEntityValue = function(){

        if(!$scope.deleteValue.value){
            return;
        }



        var req = {
            method: 'POST',
            url: defaultURL + '/delete-entity-value',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: $scope.entityData.name,
                value: $scope.deleteValue.value
            }
        };

        $http(req).then(function (data) {

            if (data.status == 200) {

                $scope.entityData.values.splice($scope.deleteValueIndex, 1);
                $scope.deleteValueIndex = null;
                $scope.deleteValue = null;
                $scope.showDeleteEntityValue = false;
            }

        }).catch(function (data) {

        });
    };
    $scope.deleteEntity = function(event, entityID){



        if(!entityID){
            return;
        }

        var req = {
            method: 'POST',
            url: defaultURL + '/delete-entity',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: entityID
            }
        };

        $http(req).then(function (data) {

            if (data.status == 200) {
                $scope.getAllEntities();
                $scope.entityData = null;
                $scope.showDeleteEntity = false;
            }

        }).catch(function (data) {

        });
    }
    $scope.storeNewEntity = function (entity, type) {



        $scope.addEntity(entity , type);
    };

    $scope.storeNewEntityValue = function (entity, value, expressions) {


        $scope.addEntityValue(entity, $scope.createAddEntityValueObject(value, expressions));
    };
    $scope.createAddEntityValueObject = function (value, expressions) {
        var addObj = {
            value: value,

            expressions: []
        }

        for (var i = 0; i < expressions.length; i++) {
            addObj.expressions.push(expressions[i].text);
        }

        return addObj;
    }
    $scope.addEntityValue = function (entity, valueObject) {
        var req = {
            method: 'POST',
            url: defaultURL + '/add-entity-value',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: entity,
                valueObject: valueObject
            }
        };

        $http(req).then(function (data) {

            if (data.status == 200) {


            }

        }).catch(function (data) {

        });
    };
    $scope.addEntity = function (entity, type) {

        if(typeof type == 'undefined' || type == '' ){
            var addObj = {
                id : entity.replace(/ /g, "_")
            }
        }else if(type == 'keywords'){
            var addObj = {
                id : entity.replace(/ /g, "_"),
                lookups : [type]
            }
        }
        var req = {
            method: 'POST',
            url: defaultURL + '/add-entity',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: entity.replace(/ /g, "_"),
                entityObj : addObj
            }
        };

        $http(req).then(function (data) {

            if (data.status == 200) {

                $scope.showCreateEntity = false;
                $scope.allEntities = false;
                $scope.getAllEntities();
            }

        }).catch(function (data) {

        });
    };

    $scope.addKeywordSynonym = function (entity, value, expression, entityValue) {
        var req = {
            method: 'POST',
            url: defaultURL + '/add-keyword-expression',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                entity: entity,
                value: value,
                expression: {expression: expression}
            }
        };

        $http(req).then(function (data) {


            if (data.status == 200) {

            }

        }).catch(function (data) {
            $scope.removeSynonym(entityValue, expression);
        });
    };

    $scope.removeSynonym = function (entityValue, deleteExpression) {
        if (entityValue.expressions.indexOf(deleteExpression) > -1) {
            entityValue.expressions = entityValue.expressions.splice(entityValue.expressions.indexOf(deleteExpression), 1);
        }
    };

    $scope.removeDoubleValuesInSynonims = function (entityData) {
        var newData = entityData;
        for (var i = 0; i < newData.values.length; i++) {
            if (newData.values[i]) {
                var doubleValue = newData.values[i].expressions.indexOf(newData.values[i].value);

                if (doubleValue > -1) {
                    newData.values[i].expressions.splice(doubleValue, 1);
                }
            }
        }

        return newData;
    }

    $(document).ready(function () {
        $('.entity-select').select2({
            width: '100%',
            placeholder: "Selecteer een entity"
        });
    });
});