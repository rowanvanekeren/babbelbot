angular.module('botApp').controller("dialogueController", function ($scope, $http, $parse, shrinkLoading) {

    $scope.newDialogueTrigger = function (formElem) {
        console.log(formElem);
        $scope.showCreateDialogue = !$scope.showCreateDialogue;
        $scope.resetForm(formElem);
    };
    $scope.resetForm = function(formElem){

        for(var key in  formElem.$$controls){
            //console.log(formElem.$$controls[key].$name);
            var fieldName = formElem.$$controls[key].$name;
            var serverMessage = $parse(formElem.$name + '.' + fieldName + '.$error.serverMessage');
            //var model = $parse(formElem.$name + '.' + fieldName);
            formElem.$setValidity(fieldName, true, formElem);
            serverMessage.assign($scope, undefined);
            //model.assign($scope, undefined);
        }

        console.log('formname = ' + formElem.$name);

        $('form[name=' + formElem.$name + '] :input').each(function(){
            var input = $(this); // This is the jquery object of the input, do what you will

            input.val('');
            input.trigger('input'); // Use for Chrome/Firefox/Edge
            input.trigger('change'); // Use for Chrome/Firefox/Edge + IE11
        });
    }


    $scope.storeNewDialogue = function(currModel){
        console.log(currModel);
        //$scope.$apply();
        setLoadingButton('.async-save', true, 'Opslaan');
        //console.log( currModel.access_token.$modelValue);
        var req = {
            method: 'POST',
            url: '../create-dialogue',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                'description': currModel.description.$modelValue,
                'title': currModel.title.$modelValue
            }
        };

        $http(req).then(function (data) {

            console.log('success');

            console.log(data);

            $scope.parseServerMessages(data.config.data, data.config.data , data.status, currModel);

            setLoadingButton('.async-save', false, 'Opslaan');

            $scope.newDialogueTrigger(currModel);

            $scope.getDialogues(1);


        }).catch(function (data) {

            console.log(data);
            console.log('error');

            $scope.parseServerMessages(data.data, data.config.data ,data.status, currModel);

            setLoadingButton('.async-save', false, 'Opslaan');

        });
    }

    function setLoadingButton(element, trueOrFalse , defaultText){
        var icon = ' <i class="fa fa-repeat"></i>';
        if(!trueOrFalse){
            angular.element( document.querySelector( element )).html(defaultText);
        }else if(trueOrFalse){
            angular.element( document.querySelector( element )).html(defaultText + icon);
        }

    }


    $scope.parseServerMessages = function (serverResponseData, fullArrayInputs, status, currModel) {
        //currModel = the name of the form element
        //fullArrayInputs = an array of all the input available in the form
        for (var fieldName in fullArrayInputs) {
            var message = serverResponseData[fieldName];
            var serverMessage = $parse(currModel.$name + '.' + fieldName + '.$error.serverMessage');
            if (status == 200) {
                currModel.$setValidity(fieldName, true, currModel);
                serverMessage.assign($scope, undefined);
            } else {
                if (typeof serverResponseData[fieldName] == 'undefined' || typeof serverResponseData[fieldName] == '') {
                    currModel.$setValidity(fieldName, true, currModel);
                    serverMessage.assign($scope, undefined);
                }
                else if (typeof serverResponseData[fieldName] != 'undefined' || typeof serverResponseData[fieldName] != '') {
                    currModel.$setValidity(fieldName, false, currModel);
                    serverMessage.assign($scope, serverResponseData[fieldName]);
                }
            }

        }
    };
    $scope.getDialogues = function(pagenumber){
        $scope.loadingDialogues = true;
        if(typeof  $scope.pageNumber == 'undefined' ||  $scope.pageNumber == ''){
            $scope.pageNumber = 1;
        }

        if(typeof pagenumber != 'undefined'){
            $scope.pageNumber = pagenumber;
            $scope.dialogues = undefined;
        }
        var apiURL = '../get-dialogues';

        $http.get(apiURL + '?page=' + $scope.pageNumber).then(function (data) {
            // console.log(data);
            if(data.data.data.length == 0){
                $scope.latestPost = true;
            }else{
                $scope.latestPost = false;

                if(typeof $scope.dialogues == 'undefined'){
                    $scope.dialogues = data.data.data
                }else{

                    var concattedArray = $scope.dialogues.concat(data.data.data);
                    $scope.dialogues = concattedArray;
                }



            }
            $scope.loadingDialogues = false;
        }).catch(function(data){

        });
        $scope.pageNumber += 1;

    };


    $scope.$on("atBottomOfElem", function() {
        $scope.getDialogues();
    });

    $scope.inputEnter = function(currentElement, currentScope) {

        var inputObject = {};
        inputObject[currentElement.attr('name')] = currentElement.val();
        inputObject['id'] = currentScope.dialogue.id;
        //console.log(currentElement.attr('name') + " " + currentElement.val() + ' ' + currentScope.app.id);
        console.log(inputObject);

        shrinkLoading.do(currentElement, 'loading');
        $scope.updateDialogue(inputObject, currentElement);



    }

    $scope.deleteDialogue = function(event, id){
        setLoadingButton('.danger-btn', true, 'Verwijder');
        var req = {
            method: 'POST',
            url: '../delete-dialogue',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                id : id
            }
        };

        $http(req).then(function (data) {
            console.log(data);
            setLoadingButton('.danger-btn', false, 'Verwijder');
            $scope.getDialogues(1);
            $scope.showDeleteDialogue = !$scope.showDeleteDialogue;
        }).catch(function (data) {
            console.log(data);

        });
    };
    $scope.deleteDialogueTrigger = function(id){
        $scope.deleteID = id;

        console.log( $scope.deleteID);
        $scope.showDeleteDialogue = !$scope.showDeleteDialogue;
    };
    $scope.updateDialogue = function(updateData, currentElement){
        var req = {
            method: 'POST',
            url: '../update-dialogue',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: updateData
        };

        $http(req).then(function (data) {
            console.log(data);
            shrinkLoading.do(currentElement, 'success');

        }).catch(function (data) {
            console.log(data);
            shrinkLoading.do(currentElement, 'error');
        });
    };

    $scope.selectDialogue = function(dialogue){
        var req = {
            method: 'POST',
            url: '../select-dialogue',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: dialogue
        };

        $http(req).then(function (data) {
            console.log(data);
           // $rootScope.$emit("toggleApp", data.data);

            window.location ='./dialogen/diagram';

        }).catch(function (data) {


        });
    }
});
