<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\State;
use App\StateData;
use App\StateIntent;
use App\StateIntentAnswer;
use App\StateIntentData;
use Carbon\Carbon;

class IntentController extends Controller
{
    function getIntentWit(Request $request)
    {

        $server_token = $request->session()->get('active_app')->server_token;
        return witGet($server_token, $request->user_input_intent);

    }

    function getAllEntities(Request $request)
    {
        $server_token = $request->session()->get('active_app')->server_token;
        $all_entities = json_decode(witGetEntities($server_token), true);

        if (($key = array_search('intent', $all_entities)) !== false) {
            unset($all_entities[$key]);
        }


        return array_values($all_entities);
    }

    function getIntentData(Request $request)
    {

        $server_token = $request->session()->get('active_app')->server_token;
        $full_intent = json_decode(witGetIntent($server_token, $request->intent), true);

        return $this->searchForIntentValue($full_intent['values'], $request->intent);
    }

    function getIntentEntityData(Request $request)
    {
        $server_token = $request->session()->get('active_app')->server_token;
        return witGetIntentWithEntities($server_token, $request->intent_value);
    }

    function searchForIntentValue($intentValues, $user_intent)
    {

        foreach ($intentValues as $key => $value) {
            if ($value['value'] == $user_intent) {
                return $value;
            }
        }
    }

    function getStateIntent(Request $request)
    {
        $stateIntent = StateIntent::where('state_id', $request->state_id)->with('stateIntentAnswers')->with('stateIntentData')->first();

        return $stateIntent;
    }

    function saveIntentToState($state_id, $data)
    {

        $state_intent = StateIntent::updateOrCreate(
            ['state_id' => $state_id],
            $data
        );

        if (isset($state_intent)) {
            return $state_intent;
        } else {
            return null;
        }


    }

    /*
        function saveIntentDataToIntent($intent_id, $data){
            $state_intent_data = StateIntentData::updateOrCreate(
                ['state_intents_id', $intent_id],
                $data
            );

            return $state_intent_data;
        }*/

    function updateStateName($state_id, $name, $state_intents_id)
    {
        $state = StateData::where('state_id', $state_id)->first();

        if (isset($name) && isset($state)) {

            $state_intent_data = StateIntentData::updateOrCreate(
                ['state_intents_id' => $state_intents_id],
                ['name' => $name]
            );

            $state->name = $name;

            $state->save();

            return $state;
        } else {
            return null;
        }

    }

    function saveAnswer(Request $request)
    {

        $stateIntent = $this->saveIntentToState($request->state_id, array());

        $answer = StateIntentAnswer::updateOrCreate(
            ['id' => $request->id],
            ['answer' => $request->answer,
                'answer_type' => $request->answer_type,
                'called_at' => Carbon::now(),
                'state_intents_id' => $stateIntent->id
            ]
        );

        return $answer;


    }

    public function deleteAnswer(Request $request)
    {
        if (isset($request->answer_id)) {
            $answer = StateIntentAnswer::where('id', $request->answer_id)->first();

            $answer->delete();

            return $answer;
        } else {
            return null;
        }
    }

    public function deleteActiveIntent(Request $request)
    {
        $default_state_name = '(nog geen titel)';
        $intent = StateIntent::where('id', $request->intent_id)->first();

        $intent->intent = '';

        $intent->save();

        //  $this->updateStateName($request->state_id, null , $request->intent_id);

        $intent['default_state_name'] = '(nog geen titel)';
        return $intent;


    }


    public function saveIntentLocal(Request $request)
    {


        $state_intent = $this->saveIntentToState($request->state_id, array(
            'state_id' => $request->state_id,
            'intent' => $request->intent,

        ));

        if (isset($request->name)) {
            $state = $this->updateStateName($request->state_id, $request->name, $state_intent->id);
            $state_intent['state_data'] = $state;
        }

        return $state_intent;
    }

    public function saveKeywordLocal(Request $request)
    {


        $state_intent = $this->saveIntentToState($request->state_id, array(
            'state_id' => $request->state_id,
            'keyword' => $request->keyword,
        ));

        if (isset($request->name)) {
            $state = $this->updateStateName($request->state_id, $request->name, $state_intent->id);
            $state_intent['state_data'] = $state;
        }

        return $state_intent;
    }

    public function updateStateType(Request $request)
    {

        $stateIntent = StateIntent::where('state_id', $request->state_id)->first();

        $stateIntent->response_type = $request->type;

        $stateIntent->save();

        return $stateIntent;
    }


    public function trainIntent(Request $request)
    {
        $server_token = $request->session()->get('active_app')->server_token;



        return witTrainIntent($server_token, json_encode(array($request->train_object)));
    }

    public function addWitIntent(Request $request){
        $server_token = $request->session()->get('active_app')->server_token;

        return witAddIntent($server_token, json_encode($request->new_intent));
    }
}
