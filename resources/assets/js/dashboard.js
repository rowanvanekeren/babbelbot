$(document).ready(function(){

    passwordHint();

//end of document ready function
});

function passwordHint(){
    var passwordIcon = '.see-password-input>i';
    $(passwordIcon).click(function(e){
        if( $(this).parent().children('input').attr('type') == 'text'){
            $(this).parent().children('input').attr('type', 'password');
        } else if($(this).parent().children('input').attr('type') == 'password' ){
            $(this).parent().children('input').attr('type', 'text');
        }
        $(this).toggleClass('fa-eye-slash');

    });
}
