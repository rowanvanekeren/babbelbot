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


    public function getUserApps(){
        $amountOnPage = 10;

        $apps = App::where('user_id', \Auth::user()->id)->orderBy('created_at', 'desc')->paginate($amountOnPage);

        return $apps;
    }
}
