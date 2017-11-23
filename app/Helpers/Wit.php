<?php


function witGet($token, $input){


    $url = 'https://api.wit.ai/message?v=1992017&q='. urlencode($input);
    $authorization = "Authorization: Bearer " . $token;

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array($authorization));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // make sure you get an return

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;

}

function witGetIntentWithEntities($token, $input){
    $url = 'https://api.wit.ai/message?v=1992017&q='. urlencode($input) . '&verbose=true';
    $authorization = "Authorization: Bearer " . $token;

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array($authorization));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // make sure you get an return

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
}

function witGetIntent($token/*, $intent*/){
    //$url = 'https://api.wit.ai/entities/'. urlencode($intent);
    $url = 'https://api.wit.ai/entities/intent';
    $authorization = "Authorization: Bearer " . $token;

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array($authorization));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // make sure you get an return

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
}