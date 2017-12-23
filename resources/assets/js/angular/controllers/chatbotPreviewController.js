angular.module('botApp').controller("chatbotPreviewController", function ($rootScope, $scope, $http, $parse, shrinkLoading) {
    $scope.activateChatbotPreview = function (data) {
        $scope.initChatbot(data);
    };
    $scope.initChatbot = function (data) {
        if(data.title != null){
            $('#babbelbot-chatbot-preview').babbelbot({
                babbelbotUrl: defaultURL + '/api/chatbot/' + data.unique_id,
                accessToken: data.server_token,
                title: 'babbelbot(' + data.title + ')'
            });
        }else{
            $('#babbelbot-chatbot-preview').empty();
        }

    }
    $scope.initPreview = function () {
        $scope.checkActiveApp();
    }


    $scope.checkActiveApp = function () {
        var req = {
            method: 'GET',
            url: ajaxAppSessionURL,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                /* 'Content-Type': 'application/x-www-form-urlencoded'*/
            }

        };

        $http(req).then(function (data) {
            $scope.initChatbot(data.data);
        }).catch(function (data) {


        });
    }

});
