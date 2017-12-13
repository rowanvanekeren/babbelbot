<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WebhookController extends Controller
{
  function processWebhook(Request $request){

      switch($request->action){
          case 'flight_answer' :
             return $this->flightAnswer($request->all());

          default :
              return null;
      }

  }
  function flightAnswer($data){
  if(isset($data['wit_data']['entities']['flight_from']) && isset($data['wit_data']['entities']['flight_to']) )   {
      bot_log($data['wit_data']['entities']);
      $flight_from = $data['wit_data']['entities']['flight_from'][0]['value'];
      $flight_to = $data['wit_data']['entities']['flight_to'][0]['value'];


      $answer1 =  'dus je wilt een vliegtuig van ' . $flight_from . ' naar ' . $flight_to . '?';
      $answer2 =  'Van ' . $flight_from . ' naar ' . $flight_to . '?';
      return array(
          'answers' => array(
              array('answer'=>$answer1),
              array('answer'=>$answer2),
          ),
          'quick_replies' => array(
              array('answer'=>'ja'),
              array('answer'=>'nee'),
          )
      );

  }else{
      return array(
          'answers' => array(array('answer'=>'er ging iets niet goed'))
      );
  }

  }
}
