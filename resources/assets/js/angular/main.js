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

