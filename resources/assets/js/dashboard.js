$(document).ready(function () {

    passwordHint();

    testFunction();

//end of document ready function
});

function passwordHint() {
    var passwordIcon = '.see-password-input>i';
    $(passwordIcon).click(function (e) {

        $(this).parent().children('input').focus();
        if ($(this).parent().children('input').attr('type') == 'text') {
            $(this).parent().children('input').attr('type', 'password');
        } else if ($(this).parent().children('input').attr('type') == 'password') {
            $(this).parent().children('input').attr('type', 'text');
        }
        $(this).toggleClass('fa-eye-slash');

    });

}


function testFunction() {
    var inpWrapperClass = '.input-wrapper';
    var inpIconElemClass = '.input-saving-overlay';
    var inpElemClass = '.input-wrapper input';

    var shrinkClass = 'shrink-input-wapper';

    $(window).resize(function () {
        //  $(inpWrapperClass).css('width', '100%');

        $('.processing:not(.disable-shrink)').css('width', '100%').css('width', 'calc(100% - 25px)');
        $('.input-wrapper:not(.processing)').css('width', '100%');


    });
    $(inpElemClass).focus(function () {

        var currentParent = $(this).parent();
        var cuurentInput = $(this);

        if (currentParent.hasClass('processing') && !currentParent.hasClass('disable-shrink') &&
            (cuurentInput.attr('disabled') == false || typeof cuurentInput.attr('disabled') == 'undefined')) {
            currentParent.animate({'width': (currentParent.width() + 25)}, 100, 'linear', function () {
                currentParent.removeClass('processing');
                currentParent.children(inpIconElemClass).addClass('hidden');
                currentParent.children(inpIconElemClass).addClass('fa-repeat').removeClass('fa-check');
                console.log('i added space');
            });
        } else if (currentParent.hasClass('processing') && currentParent.hasClass('disable-shrink') &&
            (cuurentInput.attr('disabled') == false || typeof cuurentInput.attr('disabled') == 'undefined')) {
            currentParent.removeClass('processing');
            currentParent.children(inpIconElemClass).addClass('hidden');
            currentParent.children(inpIconElemClass).addClass('fa-repeat').removeClass('fa-check');
        }
    });
    $(inpElemClass).keyup(function (e) {
        if (e.keyCode == 13) {
            var currentParent = $(this).parent();
            var cuurentInput = $(this);
            if (!currentParent.hasClass('disable-shrink') && !currentParent.hasClass('processing')) {
                currentParent.addClass('processing');
                cuurentInput.attr('disabled', true);
                currentParent.animate({'width': (currentParent.width() - 25)}, 100, 'linear', function () {
                    setTimeout(function () {
                        currentParent.children(inpIconElemClass).removeClass('hidden');

                        setTimeout(function () {
                            currentParent.children(inpIconElemClass).removeClass('fa-repeat').addClass('fa-check');
                            cuurentInput.attr('disabled', false);
                        }, 1000);
                    }, 150);

                });
            } else if (!currentParent.hasClass('processing')) {

                currentParent.addClass('processing');
                cuurentInput.attr('disabled', true);

                currentParent.children(inpIconElemClass).removeClass('hidden');

                setTimeout(function () {
                    currentParent.children(inpIconElemClass).removeClass('fa-repeat').addClass('fa-check');
                    cuurentInput.attr('disabled', false);
                }, 1000);
            }

        }
    });

    //function activateInputLoader(element)

    //function changeInputLoaderState(element , succes/error , message (optional) )

    //function closeInputLoader(element);

    //function watchloaderchange() <- not sure yet

    //focus and onchange fix
}