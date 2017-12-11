<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EntityController extends Controller
{
    public function getAllValuesEntity(Request $request){

        $server_token = $request->session()->get('active_app')->server_token;

        return witGetEntityValues($server_token,$request->entity);
    }


    public function addKeywordExpression(Request $request){
        $server_token = $request->session()->get('active_app')->server_token;

        return witAddEntityExpression($server_token, $request->entity, $request->value, $request->expression);
    }

    public function addEntity(Request $request){
        $server_token = $request->session()->get('active_app')->server_token;

   /*     $addObj = array(
            "id" => $request->entity,
           "lookups" => ["keywords"]
        );*/
        return witAddEntity($server_token,$request->entityObj);
    }

    public function addEntityValue(Request $request){
        $server_token = $request->session()->get('active_app')->server_token;

        return witAddKeywordEntityValue($server_token,$request->entity, $request->valueObject);
    }
}
