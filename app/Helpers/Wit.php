<?php

function witGetBot($token, $input, $callback){
    $url = 'https://api.wit.ai/message?v=1992017&q='. urlencode($input);
    $authorization = "Authorization: Bearer " . $token;

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array($authorization));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // make sure you get an return

    $response = curl_exec($curl);
    curl_close($curl);

    $callback($response);
}
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

function witGetEntityValues($token, $entity){
    //$url = 'https://api.wit.ai/entities/'. urlencode($intent);
    $url = 'https://api.wit.ai/entities/' . $entity . '?v=20170307';
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

function witAddKeywordEntityValue($token,$entity, $addObject){
    $url = 'https://api.wit.ai/entities/'. $entity . '/values?v=20170307';
    $authorization = "Authorization: Bearer " . $token;
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_HTTPHEADER, array($authorization,  'Content-Type: application/json'));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($addObject));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // make sure you get an return

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
}

function witAddEntityExpression($token, $entity, $value, $addObject){
    $url = 'https://api.wit.ai/entities/'. $entity . '/values/' . $value  . '/expressions?v=20170307';
    $authorization = "Authorization: Bearer " . $token;
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_HTTPHEADER, array($authorization,  'Content-Type: application/json'));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($addObject));
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


function witAddEntity($token, $addObj){
    $url = 'https://api.wit.ai/entities?v=20170307';
    $authorization = "Authorization: Bearer " . $token;
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_HTTPHEADER, array($authorization,  'Content-Type: application/json'));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($addObj));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // make sure you get an return

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
}

function witDeleteEntity($token, $entity){
    $url = 'https://api.wit.ai/entities/' . $entity .  '?v=20170307';
    $authorization = "Authorization: Bearer " . $token;
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_HTTPHEADER, array($authorization));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // make sure you get an return

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
}

function witDeleteEntityValue($token, $entity, $value){
    $url = 'https://api.wit.ai/entities/' . $entity .  '/values/'. $value . '?v=20170307';
    $authorization = "Authorization: Bearer " . $token;
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_HTTPHEADER, array($authorization));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // make sure you get an return

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
}

function witDeleteEntityExpression($token, $entity, $value, $expression){
    $url = 'https://api.wit.ai/entities/'. $entity . '/values/'. $value .'/expressions/' .  rawurlencode($expression) . '?v=20170307';
    $authorization = "Authorization: Bearer " . $token;
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_HTTPHEADER, array($authorization));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // make sure you get an return

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
}


