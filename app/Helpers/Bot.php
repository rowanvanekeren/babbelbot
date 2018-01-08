<?php

function testBot()
{
    return 'testbot';
}

function handleRequest($cache_id, $unique_id, $user_input, $botDriver = 'default', $callback)
{
    $cacheObj = getOrInitCache($cache_id, $unique_id, $botDriver);

    witGetBot($cacheObj['app']['server_token'], $user_input, function ($data) use ($callback) {
        $callback($data);
    });


}

function processRequest($cache_id, $unique_id, $user_input, $botDriver = 'default', $wit_data)
{
    $cacheObj = getOrInitCache($cache_id, $unique_id, $botDriver);
    /*   cache object {
            'dialogue_id' : 1
            'state' : stateobject,
            'app' : appObject,
            'data' : requestObject,
            'driver' : facebook or normal,
            'parameters' : {param1 : 1, param2: 2}
        }*/


    //return if cacheobj is not set and so cache not exist
    if (!isset($cacheObj)) {
        if (!isset($cacheObj['app'])) {
            return;
        }
    }

    /*  $wit_data = witGet($cacheObj['app']['server_token'], $user_input);
      $wit_data = witGet($cacheObj['app']['server_token'], $user_input);*/

    $wit_data = json_decode($wit_data, true);

    updateCache($cache_id, 'data', array(
        'wit_data' => $wit_data,
        'user_input' => $user_input
    ));

    if (isset($wit_data['entities']['intent'])) {
        $wit_intent = $wit_data['entities']['intent'][0]['value'];
    } else {
        $wit_intent = null;
    }

    /* data for responsetype backend */
    $backend_data = array(
        'wit_data' => $wit_data,
        'user_input' => $user_input
    );

    //1. check if has dialogue
    if (isset($cacheObj['dialogue_id']) && !empty($cacheObj['dialogue_id']) && !empty($cacheObj['app'])) {

        //1.1  check next state
        if (isset($cacheObj['state'])) {


            $next_state = searchNextStates($cache_id, $cacheObj['state']['next_states'], $wit_intent, $user_input);

            if (isset($next_state)) {

                return $next_state;
            }
        }

        //1.2 no next state found check other dialogues for start dialogue
        $start_dialogue = searchStartState($cache_id, $cacheObj['app']['id'], $wit_intent);
        if (isset($start_dialogue)) {

            return $start_dialogue;
        }
    }


    //2. there is no dialogue check for start dialogue
    if (!isset($cacheObj['dialogue_id']) && empty($cacheObj['dialogue_id']) && !empty($cacheObj['app']) && isset($wit_intent)) {


        $start_dialogue = searchStartState($cache_id, $cacheObj['app']['id'], $wit_intent);
        if (isset($start_dialogue)) {
            return $start_dialogue;
        }
    }

    //3. there is no start dialogue check for standard answer
    if (!isset($start_dialogue) && !empty($cacheObj['app']) && isset($wit_intent)) {
        $standard_intent = searchStandardAnswer($cacheObj['app']['id'], $wit_intent);
        if (isset($standard_intent)) {
            return $standard_intent;
        }
    }

    //4. there is no standard intent get standard error message
    if (!isset($standard_intent) && !empty($cacheObj['app'])) {
        $standard_error_message = getStandardErrorMessage($cacheObj['app']['id']);
        if (isset($standard_error_message)) {
            return $standard_error_message;
        }
    }

    return array('answers' => array(array('answer' => 'error')));


}

function getDialogue($cacheObject, $intent)
{
    if (hasActiveDialogue($cacheObject)) {
        // getNextState();
    } else if (!hasActiveDialogue($cacheObject)) {
        //searchStartState($app_id, $intent);
    }
}


function searchStartState($cache_id, $app_id, $intent)
{
    $dialogues = App\Dialogue::where('app_id', $app_id)->with('startState')->get();


    if (isset($dialogues)) {
        foreach ($dialogues as $key => $value) {

            if (isset($value)) {

                if (isset($value['startState']['stateIntents'])) {

                    if ($value['startState']['stateIntents']['intent'] == $intent) {


                        $answers = getStateIntentAnswers($cache_id, $value['startState']['stateIntents']['id'],
                            $value['startState']['stateIntents']['response_type']);

                        if (!empty($answers['stay']) && $answers['stay'] == true) {
                            //no update cache
                        } else {
                            updateCache($cache_id, 'dialogue_id', $value['startState']['dialogue_id']);
                            updateCache($cache_id, 'state', $value['startState']);
                        }

                        $renderd_answers = renderAnswers($answers);

                        return $renderd_answers;
                    }
                }
            }

        }
    } else {
        return null;
    }
}

function searchNextStates($cache_id, $nextStates, $intent = null, $user_input = null)
{
    // $test = '["1", "4"]';

    $states = App\State::with('stateIntents')->findMany(json_decode($nextStates));


    if (isset($states)) {
        foreach ($states as $key1 => $value1) {
            if (isset($value1->stateIntents)) {

                if ($value1->stateIntents->intent_type == 2 && strtolower($value1->stateIntents->keyword) == strtolower($user_input)) {

                    $answers = getStateIntentAnswers($cache_id, $value1->stateIntents['id'], $value1->stateIntents['response_type']);

                    if (isset($answers)) {
                        $renderd_answers = renderAnswers($answers);

                        if (!empty($answers['stay']) && $answers['stay'] == true) {
                            //no update cache
                        } else {
                            updateCache($cache_id, 'dialogue_id', $value1['dialogue_id']);
                            updateCache($cache_id, 'state', $value1);
                        }
                        return $renderd_answers;
                    }

                }
            }
        }

        if (isset($intent)) {
            foreach ($states as $key2 => $value2) {

                if (isset($value2->stateIntents)) {
                    if ($value2->stateIntents->intent_type == 1 && $value2->stateIntents->intent == $intent) {
                        $answers = getStateIntentAnswers($cache_id, $value2->stateIntents['id'], $value2->stateIntents['response_type']);

                        if (isset($answers)) {
                            $renderd_answers = renderAnswers($answers);

                            if (!empty($answers['stay']) && $answers['stay'] == true) {
                                //no update cache
                            } else {
                                updateCache($cache_id, 'dialogue_id', $value2['dialogue_id']);
                                updateCache($cache_id, 'state', $value2);
                            }

                            return $renderd_answers;
                        }
                    }
                }
            }
        }


        foreach ($states as $key3 => $value3) {

            if (isset($value3->stateIntents)) {
                if ($value3->stateIntents->intent_type == 3) {

                    $answers = getStateIntentAnswers($cache_id, $value3->stateIntents['id'], $value3->stateIntents['response_type']);

                    if (isset($answers)) {
                        $renderd_answers = renderAnswers($answers);

                        if (!empty($answers['stay']) && $answers['stay'] == true) {
                            //no update cache
                        } else {
                            updateCache($cache_id, 'dialogue_id', $value3['dialogue_id']);
                            updateCache($cache_id, 'state', $value3);
                        }

                        if (isset($value3->stateIntents->parameter)) {
                            if ($value3->stateIntents->parameter != '' || $value3->stateIntents->parameter != null) {

                                updateCache($cache_id, 'parameters', array($value3->stateIntents->parameter => $user_input));
                            }

                        }
                        return $renderd_answers;
                    }


                }
            }
        }

        return null;
    }

    return null;
}

function searchStandardAnswer($app_id, $intent)
{
    $intent = App\Intent::where('app_id', $app_id)->where('intent', $intent)->where('intent_type', 1)->with('intentAnswers')->first();

    if (isset($intent)) {
        if (isset($intent['intentAnswers']) && !empty($intent['intentAnswers']) && isset($intent['intentAnswers'][0])) {

            //make array from answers
            $answerArray = array();
            foreach ($intent['intentAnswers'] as $key => $value) {
                array_push($answerArray, $value);
            }

            $rendered_answers = renderAnswers(array('answers' => $answerArray));

            if (isset($rendered_answers)) {
                return $rendered_answers;
            } else {
                return null;
            }

        }

    }

    return null;
}

function getStandardErrorMessage($app_id)
{
    $intent = App\Intent::where('app_id', $app_id)->where('intent_type', 9)->with('intentAnswers')->first();

    if (isset($intent)) {
        if (isset($intent['intentAnswers']) && !empty($intent['intentAnswers']) && isset($intent['intentAnswers'][0])) {

            //make array from answers
            $answerArray = array();
            foreach ($intent['intentAnswers'] as $key => $value) {
                array_push($answerArray, $value);
            }

            $rendered_answers = renderAnswers(array('answers' => $answerArray));

            if (isset($rendered_answers)) {
                return $rendered_answers;
            } else {
                return null;
            }
        }
    }
}

function getOrInitCache($cache_id, $unique_id, $botDriver)
{

    $expiresAt = Carbon\Carbon::now()->addMinutes(30);
    if (!Cache::has($cache_id)) {

        if (isset($unique_id)) {
            $app = App\App::where('unique_id', 'LIKE', $unique_id)->first();

            if (isset($app)) {
                $cacheObj = array(
                    'app' => $app,
                    'driver' => $botDriver
                );
                Cache::add($cache_id, $cacheObj, $expiresAt);
                $cacheObj = Cache::get($cache_id);
                return $cacheObj;
            } else {
                return null;
            }

        }
    } else {
        $cacheObj = Cache::get($cache_id);
        return $cacheObj;
    }
}

function updateCache($cache_id, $key, $value)
{
    $expiresAt = Carbon\Carbon::now()->addMinutes(30);

    $cacheObj = Cache::get($cache_id);


    if (isset($cacheObj)) {
        if (strtolower($key) == 'parameters') {

            if (!empty($value)) {

                if (empty($cacheObj['parameters'])) {
                    $cacheObj['parameters'] = array();
                }

                if (is_array($value) && is_array($cacheObj['parameters'])) {
                    foreach ($value as $indexKey => $item) {
                        $cacheObj['parameters'][$indexKey] = $item;
                    }
                }


            }
        } else {
            $cacheObj[$key] = $value;
        }
        bot_log($cacheObj);
        Cache::put($cache_id, $cacheObj, $expiresAt);
    }
}

function getStateIntentAnswers($cache_id, $intent_id, $response_type)
{
    if (isset($intent_id) && isset($response_type)) {
        $answers = \App\StateIntentAnswer::where('state_intents_id', $intent_id)->get();


        if (isset($response_type) && isset($answers)) {

            switch ($response_type) {

                case 5 : //send to backend

                    $cache_object = Cache::get($cache_id);

                    return processBackendResponse($cache_object, $intent_id);
                case 4 : //quickReplies and normal messages

                    return array(

                        'quick_replies' => extractQuickReplies($answers),
                        'answers' => extractDefaultMessages($answers),
                    );
                case 2 : //nprmal message

                    return array(
                        'answers' => extractDefaultMessages($answers),
                    );
                case 3 : //quick replies
                    return array(
                        'quick_replies' => extractQuickReplies($answers)
                    );
                case 1 : //none
                    $cache_object = Cache::get($cache_id);

                    $standard_error_message = getStandardErrorMessage($cache_object['app']['id']);
                    if (isset($standard_error_message)) {
                        return $standard_error_message;
                    }else{
                        return null;
                    }

            }
        }
    }


}

function extractQuickReplies($answers)
{
    $returnArray = array();
    foreach ($answers as $key => $value) {

        if ($value->answer_type == 2) {

            array_push($returnArray, $value);
        }

    }

    if (!empty($returnArray)) {
        return $returnArray;
    } else {
        return null;
    }
}

function extractDefaultMessages($answers)
{
    $returnArray = array();
    foreach ($answers as $key => $value) {
        if ($value->answer_type == 1) {
            array_push($returnArray, $value);
        }

    }

    if (!empty($returnArray)) {
        return $returnArray;
    } else {
        return null;
    }


}

function renderAnswers($answers)
{
    //you can also directly return if you want to
    $returnArray = array(
        'quick_replies' => array(),
        'answers' => ''
    );

    if (isset($answers['answers'])) {
        $index = array_rand($answers['answers'], 1);
        $returnArray['answers'] = array($answers['answers'][$index]);
    }
    if (isset($answers['quick_replies'])) {
        $returnArray['quick_replies'] = $answers['quick_replies'];
    }
    //maybe some additional logic

    return $returnArray;
}

function hasActiveDialogue($cacheObject)
{
    if (keyCacheObjectExist($cacheObject, 'dialogue_id') && keyCacheObjectExist($cacheObject, 'state')) {
        return true;
    } else if (!keyCacheObjectExist($cacheObject, 'dialogue_id') && !keyCacheObjectExist($cacheObject, 'state')) {
        return false;
    }
}

;

function keyCacheObjectExist($cacheObject, $key)
{
    if (isset($cacheObject)) {
        if (isset($cacheObject[$key]) && !empty($cacheObject[$key])) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function processBackendResponse($cacheObject, $intent_id)
{

    $intent = \App\StateIntent::where('id', $intent_id)->first();


    if (!isset($cacheObject) || !isset($intent)) {
        return null;
    }

    if (!isset($cacheObject['app']['webhook']) || empty($cacheObject['app']['webhook']) || empty($cacheObject['data'])) {
        return null;
    }


    $webhookURL = $cacheObject['app']['webhook'];


    $webhookObject = array(
        'user_input' => $cacheObject['data']['user_input'],
        'wit_data' => $cacheObject['data']['wit_data'],
        'action' => $intent->action,
        'parameters' => (!empty($cacheObject['parameters']) ? $cacheObject['parameters'] : null)
    );

    //bot_log(sendBackendRequest($webhookURL, $webhookObject);

    return sendBackendRequest($webhookURL, $webhookObject);


}

function sendBackendRequest($url, $addObj)
{
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($addObj));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // make sure you get an return
    $response = curl_exec($curl);
    curl_close($curl);
    bot_log($response);

    $decoded_response = json_decode($response, true);

    if (isset($decoded_response['answers']) || isset($decoded_response['quick_replies'])) {
        if (isset($decoded_response['answers'][0]['answer']) || isset($decoded_response['quick_replies'][0]['answer'])) {
            try {
                return $decoded_response;
            } catch (Exception $e) {
                return null;
            }

        } else {
            return null;
        }
    } else {
        return null;
    }
}


