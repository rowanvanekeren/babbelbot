angular.module('botApp').controller("appController", function ($rootScope, $scope, $http, $parse, shrinkLoading, buttonLoading) {

    $scope.newAppTrigger = function (formElem) {

        $scope.showCreateApp = !$scope.showCreateApp;
        $scope.resetForm(formElem);
    };

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



    $scope.resetForm = function(formElem){

        for(var key in  formElem.$$controls){

            var fieldName = formElem.$$controls[key].$name;
            var serverMessage = $parse(formElem.$name + '.' + fieldName + '.$error.serverMessage');
            //var model = $parse(formElem.$name + '.' + fieldName);
            formElem.$setValidity(fieldName, true, formElem);
            serverMessage.assign($scope, undefined);
            //model.assign($scope, undefined);
        }


        $('form[name=' + formElem.$name + '] :input').each(function(){
            var input = $(this); // This is the jquery object of the input, do what you will

            input.val('');
            input.trigger('input'); // Use for Chrome/Firefox/Edge
            input.trigger('change'); // Use for Chrome/Firefox/Edge + IE11
        });



    }
    $scope.deleteAppTrigger = function(id){
        $scope.deleteID = id;


        $scope.showDeleteApp = !$scope.showDeleteApp;
    };

    $scope.checkWitConnection = function(succesCallback, errorCallback){
        var req = {
            method: 'POST',
            url: './check-wit-connection',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
        };

        $http(req).then(function (data) {

            var response = data.data;

            if(typeof response.code != 'undefined'){
                if(response.code == 'no-auth'){
                    errorCallback(response.error);
                }else{
                    succesCallback();
                }

            }else{
                succesCallback();
            }
        }).catch(function (data) {

            var response = data.data;
            if(typeof response.code != 'undefined'){
                if(response.code == 'no-auth'){
                    errorCallback(response.error);
                }else{
                    succesCallback();
                }

            }else{
                succesCallback();
            }
        });
    };


    $scope.deleteApp = function(event, id){
        buttonLoading.do($('.danger-btn'), 'loading');
        var req = {
            method: 'POST',
            url: './delete-app',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                id : id
            }
        };

        $http(req).then(function (data) {

            buttonLoading.do($('.danger-btn'), 'success');

            $scope.getUserApps(1);
            $scope.showDeleteApp = !$scope.showDeleteApp;


        }).catch(function (data) {

            buttonLoading.do($('.danger-btn'), 'error');
        });

    };
    $scope.updateApp = function(updateData, currentElement){
        var req = {
            method: 'POST',
            url: './update-app',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: updateData
        };

        $http(req).then(function (data) {
            console.log(currentElement);
            shrinkLoading.do(currentElement, 'success');

        }).catch(function (data) {

            shrinkLoading.do(currentElement, 'error');
        });
    };
    $scope.storeNewApp = function (currModel) {


        buttonLoading.do($('.async-save'), 'loading');
        //console.log( currModel.access_token.$modelValue);
        var req = {
            method: 'POST',
            url: './create-app',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                'access_token': currModel.access_token.$modelValue,
                'server_token': currModel.server_token.$modelValue,
                'title': currModel.title.$modelValue
            }
        };

        $http(req).then(function (data) {



            $scope.parseServerMessages(data.config.data, data.config.data , data.status, currModel);

            buttonLoading.do($('.async-save'), 'success');

            $scope.newAppTrigger(currModel);

            $scope.getUserApps(1);


        }).catch(function (data) {


            $scope.parseServerMessages(data.data, data.config.data ,data.status, currModel);

            buttonLoading.do($('.async-save'), 'error');

        });

    };

    $scope.getUserApps = function(pagenumber){
        $scope.loadingApps = true;
        if(typeof  $scope.pageNumber == 'undefined' ||  $scope.pageNumber == ''){
            $scope.pageNumber = 1;
        }

        if(typeof pagenumber != 'undefined'){
            $scope.pageNumber = pagenumber;
            $scope.apps = undefined;
        }
        var apiURL = './get-user-apps';

            $http.get(apiURL + '?page=' + $scope.pageNumber).then(function (data) {
               // console.log(data);
                if(data.data.data.length == 0){
                    $scope.latestPost = true;
                }else{
                    $scope.latestPost = false;

                    if(typeof $scope.apps == 'undefined'){
                        $scope.apps = data.data.data
                    }else{
                        var currentAppsOnScreen = $scope.apps;
                        var concattedArray = $scope.apps.concat(data.data.data);
                        $scope.apps = concattedArray;
                    }



                }
                $scope.loadingApps = false;
            }).catch(function(data){

            });
            $scope.pageNumber += 1;

    };

    $scope.$on("atBottomOfElem", function() {
        $scope.getUserApps();
    });
    $scope.$on("repeatReady", function() {

    });

    $scope.inputEnter = function(currentElement, currentScope) {

        var inputObject = {};
        inputObject[currentElement.attr('name')] = currentElement.val();
        inputObject['id'] = currentScope.app.id;


        shrinkLoading.do(currentElement, 'loading');
        $scope.updateApp(inputObject, currentElement);



    }

  /*  function shrinkLoading(element, state){
        var inpIconElemClass = '.input-saving-overlay';
        var inpElemClass = '.input-wrapper input';
        var currentParent = element.parent();
        var cuurentInput = element;
        if (!currentParent.hasClass('disable-shrink') && !currentParent.hasClass('processing') && state == 'loading') {
            currentParent.addClass('processing');
            currentParent.children(inpIconElemClass).removeClass('fa-times').addClass('fa-repeat');
            cuurentInput.attr('disabled', true);
            currentParent.animate({'width': (currentParent.width() - 25)}, 100, 'linear', function () {
                setTimeout(function () {
                    currentParent.children(inpIconElemClass).removeClass('hidden');
                }, 150);

            });
        }else if (!currentParent.hasClass('processing')) {

            currentParent.addClass('processing');
            cuurentInput.attr('disabled', true);

            currentParent.children(inpIconElemClass).removeClass('hidden');


        }else if(state == 'success') {

                currentParent.children(inpIconElemClass).removeClass('fa-repeat fa-times').addClass('fa-check');
          /!*  currentParent.removeClass('processing');*!/
                cuurentInput.attr('disabled', false);

        }else if(state == 'error'){
            currentParent.children(inpIconElemClass).removeClass('fa-repeat fa-check').addClass('fa-times');
          /!*  currentParent.removeClass('processing');*!/
            cuurentInput.attr('disabled', false);
        }






    }*/

    $scope.growBack = function(event){


        var inpElemClass = '.input-wrapper input';
        var inpIconElemClass = '.input-saving-overlay';

            var currentParent = $(event.target.parentElement);
            var cuurentInput = $(event.currentTarget);

            if (currentParent.hasClass('processing') && !currentParent.hasClass('disable-shrink') &&
                (cuurentInput.attr('disabled') == false || typeof cuurentInput.attr('disabled') == 'undefined')) {
                currentParent.animate({'width': (currentParent.width() + 25)}, 100, 'linear', function () {
                    currentParent.removeClass('processing');
                    currentParent.children(inpIconElemClass).addClass('hidden');
                    currentParent.children(inpIconElemClass).addClass('fa-repeat').removeClass('fa-check');

                });
            } else if (currentParent.hasClass('processing') && currentParent.hasClass('disable-shrink') &&
                (cuurentInput.attr('disabled') == false || typeof cuurentInput.attr('disabled') == 'undefined')) {
                currentParent.removeClass('processing');
                currentParent.children(inpIconElemClass).addClass('hidden');
                currentParent.children(inpIconElemClass).addClass('fa-repeat').removeClass('fa-check');
            }

    }


    $scope.selectApp = function(event, app, apps, index, force){

        if(!force){
            buttonLoading.do($(event.currentTarget), 'loading');
        }

        var req = {
            method: 'POST',
            url: './select-app',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: app
        };

        $http(req).then(function (data) {
            var appData = data.data;
            if(!force){

            $scope.checkWitConnection(function(){
                $rootScope.$emit("toggleApp", appData);
                buttonLoading.do($(event.currentTarget), 'success');

            },function(error){
                $scope.clearAppSession();
                buttonLoading.do($(event.currentTarget), 'error');
             $scope.apps[index]['errors'] = ['Wit.ai response: ' + error];


            });
            }else{
              $rootScope.$emit("toggleApp", appData);
                delete $scope.apps[index]['errors'];
            }



        }).catch(function (data) {
            if(!force){
                buttonLoading.do($(event.currentTarget), 'error');
            }


        });
    }
    $scope.clearAppSession = function(){
        var req = {
            method: 'POST',
            url: './clear-session',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

        };

        $http(req).then(function (data) {

            $rootScope.$emit("toggleApp", {
                unique_id : null,
                title: null
            });
        }).catch(function (data) {

        });
    };



});