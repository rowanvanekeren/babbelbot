<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;

class SessionController extends Controller
{
    public function storeAppToSession(Request $request){

    }

    public function checkActiveApp(Request $request){
        if($request->session()->get('active_app') === null){
            return Response::json(['error' => 'Session not found'], 404);
        }else if( $request->session()->get('active_app') !== null){
            return Response::json($request->session()->get('active_app'), 200);
        }

    }
}
