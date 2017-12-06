<?php
function bot_log($your_log_content){
    if(!isset($your_log_content) || $your_log_content == ''){
        $your_log_content = 'NOT SET';
    }
    try{
        $log  = $_SERVER['REMOTE_ADDR'].' - '.date("j F Y, G:i").PHP_EOL.
            "Content: ". json_encode($your_log_content) .PHP_EOL.
            "-------------------------".PHP_EOL;

    }catch(Exception $e){
        $log  = $_SERVER['REMOTE_ADDR'].' - '.date("j F Y, G:i").PHP_EOL.
            "Content: ERROR " .PHP_EOL.
            "-------------------------".PHP_EOL;
    }

    $file = __DIR__ . '/botlog.txt';
    $open = fopen( $file, "a" );
    $write = fputs( $open, $log );

    fclose( $open );
}


