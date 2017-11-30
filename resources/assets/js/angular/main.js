/**
 * Created by Rowan on 4-11-2017.
 */
var botApp = angular.module('botApp', ['ngCookies', 'ngAnimate']);

// this is our directive
angular.module('botApp').directive('scrolly', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            console.log('loading directive');

            element.bind('scroll', function () {
                //   console.log('in scroll');
                //   console.log(raw.scrollTop + raw.offsetHeight);
                //   console.log(raw.scrollHeight);
                if (raw.scrollTop + raw.offsetHeight > (raw.scrollHeight - 5)) {
                    console.log("I am at the bottom");
                    scope.$broadcast('atBottomOfElem');
                    scope.$apply(attrs.scrolly);
                }
            });
        }
    };
});

angular.module('botApp').directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter, {$element: element});
                });

                event.preventDefault();
            }
        });
    };
});

angular.module('botApp').directive('myRepeatDirective', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {

        }
    };
});

/*angular.module('botApp').directive('navActiveApp', function() {
 return {
 restrict: 'A',
 link: function(scope, element, attrs) {
 scope.$on('broadCastActiveApp', function(event, broadCastActiveApp) {
 console.log('broadcast nav');
 // element.find('input').prop('checked', broadCastActiveApp);
 });
 }
 };
 });*/


angular.module('botApp').directive('activeApp', ['$rootScope',function ($rootScope) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {

            $rootScope.$on('toggleApp', function (event, data) {
                console.log('get a broadcast');
                $scope.$eval(attrs.activeApp, {$element: element, data: data});

            });

        }
    };
}]);

angular.module('botApp').directive('activeTraining', ['$rootScope',function ($rootScope) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {

            $rootScope.$on('toggleIntentTraining', function (event, data) {
                console.log('get a broadcast');
                $scope.$eval(attrs.activeTraining, {$element: element, data: data});

            });

        }
    };
}]);

angular.module('botApp').directive('activeEntity', ['$rootScope',function ($rootScope) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {

            $rootScope.$on('toggleIntentEntity', function (event, data) {
                console.log('get a broadcast');
                $scope.$eval(attrs.activeEntity, {$element: element, data: data});

            });

        }
    };
}]);

angular.module('botApp').factory('shrinkLoading', function() {
    return {
        do: function(element, state) {
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
                /*  currentParent.removeClass('processing');*/
                cuurentInput.attr('disabled', false);

            }else if(state == 'error'){
                currentParent.children(inpIconElemClass).removeClass('fa-repeat fa-check').addClass('fa-times');
                /*  currentParent.removeClass('processing');*/
                cuurentInput.attr('disabled', false);
            }
        }
    };
});