<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EntityController extends Controller
{
    public function getAllValuesEntity(Request $request){

        $server_token = $request->session()->get('active_app')->server_token;

        return witGetEntityValues($server_token,$request->entity);
    }
}
