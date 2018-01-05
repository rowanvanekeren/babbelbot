<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DefaultChatbotController extends Controller
{
    public function verifyDefault($id, Request $request){

        if($request->type == 'ping'){
            return response(['ping' => 'success'], 200);
        }

    }

    public function responseDefault($id, Request $request){

        $cache_id = $request->user_id .'_'. $id;

        $cacheObj = getOrInitCache($cache_id, $id, 'default');

    /*    $answers  =  processRequest($cache_id,$id,$request->user_input, 'default', json_encode($request->wit_data));

        return $answers;*/
       // bot_log(processRequest($cache_id,$id,$request->user_input, 'default', json_encode($request->wit_data)));
        return processRequest($cache_id,$id,$request->user_input, 'default', json_encode($request->wit_data));



    }


}
