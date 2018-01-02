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

        $this->validate($request,[
            'entity' => 'required'
        ]);

   /*     $addObj = array(
            "id" => $request->entity,
           "lookups" => ["keywords"]
        );*/
        return witAddEntity($server_token,$request->entityObj);
    }

    public function addEntityValue(Request $request){
        $server_token = $request->session()->get('active_app')->server_token;

        $this->validate($request,[
            'entity' => 'required',
            'valueObject' => 'required'
        ]);

        return witAddKeywordEntityValue($server_token,$request->entity, $request->valueObject);
    }

    public function deleteEntity(Request $request){
        $server_token = $request->session()->get('active_app')->server_token;

        return witDeleteEntity($server_token,$request->entity);
    }

    public function deleteEntityValue(Request $request){
        $server_token = $request->session()->get('active_app')->server_token;

        return witDeleteEntityValue($server_token,$request->entity, $request->value);
    }

    public function deleteEntityExpression(Request $request){
        $server_token = $request->session()->get('active_app')->server_token;

        //return $request->all();


        return witDeleteEntityExpression($server_token,$request->entity, $request->value, $request->expression);
    }
}
