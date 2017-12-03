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

function witGetEntities($token){
    //$url = 'https://api.wit.ai/entities/'. urlencode($intent);
    $url = 'https://api.wit.ai/entities?v=20170307';
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

function witTrainIntent($token, $trainObject){
    $url = 'https://api.wit.ai/samples?v=20170307';
    $authorization = "Authorization: Bearer " . $token;
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_HTTPHEADER, array($authorization,  'Content-Type: application/json'));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($curl, CURLOPT_POSTFIELDS, $trainObject);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // make sure you get an return

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
}

function witAddIntent($token, $addObject){
    $url = 'https://api.wit.ai/entities/intent/values?v=20170307';
    $authorization = "Authorization: Bearer " . $token;
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_HTTPHEADER, array($authorization,  'Content-Type: application/json'));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($curl, CURLOPT_POSTFIELDS, $addObject);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // make sure you get an return

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
}

