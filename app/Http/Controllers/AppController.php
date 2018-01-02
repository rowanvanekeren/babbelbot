<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\App;
use App\Intent;
use App\IntentAnswer;
use Cache;
class AppController extends Controller
{
    public function create(Request $request){
        $this->validate($request,[
            'title' => 'required|max:255|unique:apps',
            'access_token' => 'required',
            'server_token' => 'required',

        ]);

        $user_id = \Auth::user()->id;

        $app = new App();
        $app->title = $request->title;
        $app->access_token = $request->access_token;
        $app->server_token = $request->server_token;
        $app->user_id = $user_id;
        $app->unique_id = uniqid();
        $app->active = 1;

        $app->save();

        $this->createDefaultErrorIntent($app->id);

        return $app;
    }


    public function createDefaultErrorIntent($app_id){
        $intent = new Intent();

        $intent->intent_type = 9; //type for default error message
        $intent->app_id = $app_id;

        $intent->save();

        $intentAnswer = new IntentAnswer();

        $intentAnswer->answer = 'Ik heb je niet helemaal begrepen';
        $intentAnswer->intent_id = $intent->id;
        $intentAnswer->called_at = \Carbon\Carbon::now();
        $intentAnswer->save();
    }


    public function delete(Request $request){
        $this->validate($request,[
            'id' => 'required'
        ]);

        $currentActiveSession = $request->session()->get('active_app');
        if(isset($currentActiveSession->id)){
            if($currentActiveSession->id == $request->id){
                $request->session()->forget('active_app');
            }
        }


        $app = App::where('id', $request->id);

        $app->delete();

        return $request;
    }

    public function checkConnection(Request $request){
        $app =  $request->session()->get('active_app');

        return witGet($app->server_token, 'test babbelbot connection');
    }

    public function clearSession(Request $request){
        $request->session()->forget('active_app');

        return array('status' => 'success');
    }

    public function select(Request $request){


        $app = App::where('id', $request->id)->first();

        $request->session()->put('active_app', $app);

        return  $request->session()->get('active_app');
    }

    public function update(Request $request){
        $validationData = [];

      //  return $request;
        if(array_key_exists('access_token', $request->input())){
            $validationData = [ 'access_token' => 'sometimes|required', 'id' => 'required'];
        }else if(array_key_exists('title', $request->input())){
            $validationData = ['title' => 'required|max:255|unique:apps,title,'. $request->id ,'id' => 'required'];
        }else if(array_key_exists('server_token', $request->input())){
            $validationData = ['server_token' => 'sometimes|required|' ,'id' => 'required'];
        }

        $this->validate($request,$validationData);

        App::where('id', $request->id)->update(array_except($request->input(),['id']));

        return $request;
    }


    public function getUserApps(){
        $amountOnPage = 10;

        $apps = App::where('user_id', \Auth::user()->id)->orderBy('created_at', 'desc')->paginate($amountOnPage);

        return $apps;
    }
}
