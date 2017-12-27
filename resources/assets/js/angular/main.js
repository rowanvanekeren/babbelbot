/**
 * Created by Rowan on 4-11-2017.
 */
var botApp = angular.module('botApp', ['720kb.tooltips','ngCookies', 'ngAnimate', 'ngTagsInput']);



botApp.config(function(tagsInputConfigProvider) {
    tagsInputConfigProvider
        .setDefaults('tagsInput', {
            placeholder: 'Voeg meer toe',
            minLength: 2,

        })
});


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


angular.module('botApp').directive('growBack', function () {
    return function (scope, element, attrs) {
        element.bind("focus", function (event) {
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
        });
    };
});

angular.module('botApp').directive('myRepeatDirective', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
            passwordHint();
        }
    };
});
function passwordHint() {
    var passwordIcon = '.see-password-input>i';
    $(passwordIcon).click(function (e) {
        console.log('eye clicked');
        $(this).parent().children('input').focus();
        if ($(this).parent().children('input').attr('type') == 'text') {
            $(this).parent().children('input').attr('type', 'password');
        } else if ($(this).parent().children('input').attr('type') == 'password') {
            $(this).parent().children('input').attr('type', 'text');
        }
        $(this).toggleClass('fa-eye-slash');

    });

}
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


angular.module('botApp').factory('buttonLoading', function() {
    return {
        do: function(element, state) {
            var currentInput = element;
            var currentText = element.text();

            currentInput.attr('disabled', true);
            if (state == 'loading') {
                currentInput.html(currentText + ' <i class="fa fa-repeat"></i>');

            }else if(state == 'success') {
                currentInput.html(currentText + ' <i class="fa fa-check"></i>');
                currentInput.attr('disabled', false);
                setTimeout(function(){
                    currentInput.html(currentText);
                },3000);
            }else if(state == 'error'){
                currentInput.html(currentText + ' <i class="fa fa-times"></i>');
                currentInput.attr('disabled', false);
                setTimeout(function(){
                    currentInput.html(currentText);
                },3000);
            }else if(state == 'reset'){
                currentInput.html(currentText);
                currentInput.attr('disabled', false);
            }
        }
    };
});