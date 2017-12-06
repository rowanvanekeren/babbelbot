<?php

function testBot()
{
    return 'testbot';
}
function handleRequest($cache_id, $unique_id, $user_input, $botDriver = 'default', $callback){
    $cacheObj = getOrInitCache($cache_id, $unique_id, $botDriver);

    witGetBot($cacheObj['app']['server_token'],$user_input, function($data) use ($callback){
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
                'driver' : facebook or normal,
                'parameters' : {param1 : 1, param2: 2}
            }*/


    //return if cacheobj is not set and so cache not exist
    if(!isset($cacheObj)){
       if(!isset($cacheObj['app'])){
           return;
       }
    }

  /*  $wit_data = witGet($cacheObj['app']['server_token'], $user_input);
    $wit_data = witGet($cacheObj['app']['server_token'], $user_input);*/

    $wit_data = json_decode($wit_data, true);

    if(isset($wit_data['entities']['intent'])){
        $wit_intent = $wit_data['entities']['intent'][0]['value'];
    }else{
        $wit_intent = null;
    }


    //1. check if has dialogue
    if(isset($cacheObj['dialogue_id']) && !empty($cacheObj['dialogue_id']) && !empty($cacheObj['app'])){

        //1.1  check next state
        if(isset($cacheObj['state'])){


            $next_state = searchNextStates($cache_id, $cacheObj['state']['next_states'], $wit_intent, $user_input);

            if(isset($next_state)){

                return $next_state;
            }
        }

        //1.2 no next state found check other dialogues for start dialogue
        $start_dialogue = searchStartState($cache_id, $cacheObj['app']['id'] , $wit_intent);
        if(isset($start_dialogue)){

            return $start_dialogue;
        }
    }


    //2. there is no dialogue check for start dialogue
    if(!isset($cacheObj['dialogue_id']) && empty($cacheObj['dialogue_id'])  && !empty($cacheObj['app'])  && isset($wit_intent)){


        $start_dialogue = searchStartState($cache_id, $cacheObj['app']['id'] , $wit_intent);
        if(isset($start_dialogue)){
            return $start_dialogue;
        }
    }

    //3. there is no start dialogue check for standard answer
    if(!isset($start_dialogue)  && !empty($cacheObj['app'])  && isset($wit_intent)){
        $standard_intent = searchStandardAnswer($cacheObj['app']['id'], $wit_intent);
        if(isset($standard_intent)){
            return $standard_intent;
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


                        $answers = getStateIntentAnswers($value['startState']['stateIntents']['id'],
                        $value['startState']['stateIntents']['response_type']);

                        updateCache($cache_id, 'dialogue_id', $value['startState']['dialogue_id']);
                        updateCache($cache_id, 'state', $value['startState']);

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

function searchNextStates($cache_id, $nextStates, $intent = null, $user_input = null){
   // $test = '["1", "4"]';

    $states = App\State::with('stateIntents')->findMany(json_decode($nextStates));


    if(isset($states)){
        foreach($states as $key1 => $value1){
            if(isset($value1->stateIntents)){

                if($value1->stateIntents->intent_type == 2 && strtolower($value1->stateIntents->keyword) == strtolower($user_input)){

                    $answers = getStateIntentAnswers($value1->stateIntents['id'], $value1->stateIntents['response_type']);

                    $renderd_answers = renderAnswers($answers);

                    updateCache($cache_id, 'dialogue_id', $value1['dialogue_id']);
                    updateCache($cache_id, 'state', $value1);

                    return $renderd_answers;




                }
            }
        }

        if(isset($intent)){
        foreach($states as $key2 => $value2){

            if(isset($value2->stateIntents)){
                if($value2->stateIntents->intent_type == 1 && $value2->stateIntents->intent == $intent){
                    $answers = getStateIntentAnswers($value2->stateIntents['id'], $value2->stateIntents['response_type']);
                    $renderd_answers = renderAnswers($answers);

                    updateCache($cache_id, 'dialogue_id', $value2['dialogue_id']);
                    updateCache($cache_id, 'state', $value2);

                    return $renderd_answers;
                }
            }
        }
        }
        return null;
    }

    return null;
}

function searchStandardAnswer($app_id, $intent){
    $intent = App\Intent::where('app_id',$app_id)->where('intent', $intent)->with('intentAnswers')->first();

    if(isset($intent)){
        if(isset($intent['intentAnswers'])){
            $rendered_answers = renderAnswers(array('answers' => $intent['intentAnswers']));

            if(isset($rendered_answers)){
                return $rendered_answers;
            }else{
                return null;
            }

        }

    }

    return null;
}


function getOrInitCache($cache_id, $unique_id, $botDriver){

    $expiresAt = Carbon\Carbon::now()->addMinutes(30);
    if (!Cache::has($cache_id)) {

       if(isset($unique_id)){
           $app = App\App::where('unique_id', 'LIKE',  $unique_id)->first();

           if(isset($app)){
               $cacheObj = array(
                   'app' => $app,
                   'driver' => $botDriver
               );
               Cache::add($cache_id,$cacheObj, $expiresAt);
               $cacheObj = Cache::get($cache_id);
               return $cacheObj;
           }else{
               return null;
           }

       }
    }else{
        $cacheObj = Cache::get($cache_id);
        return $cacheObj;
    }
}
function updateCache($cache_id, $key, $value){
    $expiresAt = Carbon\Carbon::now()->addMinutes(30);

    $cacheObj = Cache::get($cache_id);


    if(isset($cacheObj)){
        $cacheObj[$key] = $value;

        Cache::put($cache_id, $cacheObj, $expiresAt);
    }
}

function getStateIntentAnswers($intent_id, $response_type){
    if(isset($intent_id) && isset($response_type)){
        $answers = \App\StateIntentAnswer::where('state_intents_id', $intent_id)->get();


        if(isset($response_type) && isset($answers)){

            switch($response_type){
                case 5 : //send to backend
                    return null; // for the moment
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
                    return null;
            }
        }
    }


}
function extractQuickReplies($answers){
    $returnArray = array();
    foreach($answers as $key => $value){

        if($value->answer_type == 2){

            array_push($returnArray, $value);
        }

    }

    if(!empty($returnArray)){
        return $returnArray;
    }else{
        return null;
    }
}

function extractDefaultMessages($answers){
    $returnArray = array();
    foreach($answers as $key => $value){
        if($value->answer_type == 1){
            array_push($returnArray, $value);
        }

    }

    if(!empty($returnArray)){
        return $returnArray;
    }else{
        return null;
    }


}
function renderAnswers($answers){
    //you can also directly return if you want to
    $returnArray = array(
        'quick_replies' => array(),
        'answers' => ''
    );

    if(isset($answers['answers'])){
        $index = array_rand($answers['answers'], 1);
        $returnArray['answers'] = array($answers['answers'][$index]);
    }
    if(isset($answers['quick_replies'])){
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


