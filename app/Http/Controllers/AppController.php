<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\App;

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
        $app->active = 1;

        $app->save();

        return $app;
    }
    public function delete(Request $request){
        $this->validate($request,[
            'id' => 'required'
        ]);

        $app = App::where('id', $request->id);

        $app->delete();

        return $request;
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
