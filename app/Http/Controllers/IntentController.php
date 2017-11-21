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
    function getIntentWit(Request $request){

        $server_token = $request->session()->get('active_app')->server_token;
        return witGet($server_token,$request->user_input_intent );

    }

    function getStateIntent(Request $request){
        $stateIntent = StateIntent::where('state_id', $request->state_id)->with('stateIntentAnswers')->with('stateIntentData')->first();

        return $stateIntent;
    }

    function saveIntentToState($state_id, $data){

        $state_intent = StateIntent::updateOrCreate(
            ['state_id' => $state_id],
            $data
        );

        if(isset($state_intent)){
            return $state_intent;
        }else{
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

    function updateStateName($state_id, $name, $state_intents_id){
        $state = StateData::where('state_id', $state_id)->first();

        if(isset($name) && isset($state)){

            $state_intent_data = StateIntentData::updateOrCreate(
                ['state_intents_id'=> $state_intents_id],
                ['name' => $name]
            );

            $state->name = $name;

            $state->save();

            return $state;
        }else{
            return null;
        }

    }

    function saveAnswer(Request $request){

       $stateIntent =  $this->saveIntentToState($request->state_id, array());

       $answer = StateIntentAnswer::updateOrCreate(
           ['id'=> $request->id],
           ['answer' => $request->answer,
           'answer_type' => $request->answer_type,
            'called_at' => Carbon::now(),
            'state_intents_id'  => $stateIntent->id
           ]
       );

        return $answer;


    }

    public function deleteAnswer(Request $request){
        if(isset( $request->answer_id)){
            $answer = StateIntentAnswer::where('id' ,$request->answer_id )->first();

            $answer->delete();

            return $answer;
        }else{
            return null;
        }
    }

    public function deleteActiveIntent(Request $request){
        $intent = StateIntent::where('id', $request->intent_id)->first();

        $intent->intent = '';

        $intent->save();

        $this->updateStateName($request->state_id, $request->name, $request->intent_id);

        $intent['default_state_name'] = '(nog geen titel)';
        return $intent;


    }
    public function saveIntentLocal(Request $request){


        $state_intent = $this->saveIntentToState($request->state_id, array(
            'state_id' => $request->state_id,
            'intent'=> $request->intent,

        ));

        if(isset($request->name)){
           $state =   $this->updateStateName($request->state_id, $request->name, $state_intent->id);
           $state_intent['state_data'] =  $state;
        }

        return $state_intent;
    }

    public function updateStateType(Request $request){

        $stateIntent = StateIntent::where('state_id', $request->state_id)->first();

        $stateIntent->type = $request->type;

        $stateIntent->save();

        return $stateIntent;
    }


}
