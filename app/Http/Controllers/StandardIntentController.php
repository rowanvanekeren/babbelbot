<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Intent;
use App\IntentData;
use App\IntentAnswer;
use Carbon\Carbon;
class StandardIntentController extends Controller
{
    public function addStandardWitIntent(Request $request){
        $app_id = $request->session()->get('active_app')->id;
        $server_token = $request->session()->get('active_app')->server_token;
        $this->validate($request,[
            'intent.value' => 'required|unique:intents,intent,NULL,id,app_id,'. $app_id,
            'intent.expressions' => 'required'
        ]);



        return witAddIntent($server_token, json_encode($request->new_intent));
    }


    public function getAllIntents(Request $request){
        $app_id = $request->session()->get('active_app')->id;

        $intents = Intent::where('app_id', $app_id)->with('intentAnswers')->with('intentData')->orderBy('created_at', 'desc')->paginate(15);

        return $intents;
    }

    public function createStandard(Request $request){
        $app_id = $request->session()->get('active_app')->id;

        $intent = new Intent();
        $intent->app_id = $app_id;
        $intent->save();

        return $intent;
    }

    public function saveIntent(Request $request){
        $app_id = $request->session()->get('active_app')->id;
        $this->validate($request,[
            'intent' => 'required|unique:intents,intent,NULL,id,app_id,'. $app_id
        ]);


        $intent = Intent::where('id', $request->intent_id)->first();

        if(isset($intent)){
            $intent_data = IntentData::updateOrCreate(
                ['intent_id' => $request->intent_id],
                ['name' => $request->name]
            );
        }
        $intent->intent = $request->intent;

        $intent->save();

        return $intent;
    }

    public function deleteIntent(Request $request){
        $intent = Intent::where('id', $request->intent_id)->first();

        $intent->delete();

        return $intent;
    }

    public function deleteIntentAnswer(Request $request){
        $answer = IntentAnswer::where('id', $request->answer_id)->first();

        $answer->delete();

        return $answer;
    }
    public function saveIntentAnswer(Request $request){


        $answer = IntentAnswer::updateOrCreate(
            ['id' => $request->id],
            ['answer' => $request->answer,
                'called_at' => Carbon::now(),
                'intent_id' => $request->intent_id
            ]
        );

        return $answer;
    }
}
