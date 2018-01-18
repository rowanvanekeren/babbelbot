/**
 * Created by Rowan on 11-11-2017.
 */
angular.module('botApp').controller("userController", function ($scope, $http, $parse, buttonLoading) {

    $scope.updateUser = function (event){
        $scope.userError = null;
        buttonLoading.do($(event.currentTarget), 'loading');
        var req = {
            method: 'POST',
            url: './update-user',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },
            data: {
                name : $("input[name=name]").val()
            }
        };

        $http(req).then(function (data) {

            buttonLoading.do($(event.currentTarget), 'success');
            location.reload();

        }).catch(function (data) {
            $scope.userError = data.data.name;

            buttonLoading.do($(event.currentTarget), 'error');

        });
    };


    $scope.deleteAccount = function(event){

        buttonLoading.do($(event.currentTarget), 'loading');
        var req = {
            method: 'DELETE',
            url: './delete-account',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            },

        };

        $http(req).then(function (data) {
            buttonLoading.do($(event.currentTarget), 'success');
            location.reload();
        }).catch(function (data) {
            buttonLoading.do($(event.currentTarget), 'error');
        });

    };

    $scope.deleteLocalChatCache = function(event){

        buttonLoading.do($(event.currentTarget), 'loading');


        function setcookie(name,value,day)
        {
            var expireDate = new Date();
            expireDate.setSeconds(expireDate.getSeconds()+day*24*60*60*1000);
            document.cookie = name + "=" + value + ";path=/;expires=" + expireDate.toGMTString();
        }

        function delcookie(name)
        {
            setcookie(name,"",-1);
        }

        delcookie('bb_chatbot_user');

        setTimeout(function(){
            buttonLoading.do($(event.currentTarget), 'success');
            location.reload();
        },1000);
    }

});