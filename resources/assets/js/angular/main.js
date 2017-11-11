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
