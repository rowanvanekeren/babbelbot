<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    //REMOVE TEST
    function __construct()
    {

        //die(searchStartState(2,'flight_request'));
       // die(searchNextStates('["1", "5"]', 'tell_joke', 'teeest'));
      // $question = 'vertel mij een mop';
       $question = 'ik wil een hond';
      // $question = 'ok';
       handleRequest('testest', '5a27fa1a61876',$question , 'facebook', function($data) use ($question){
         die(json_encode(processRequest('testest', '5a27fa1a61876',$question , 'facebook', $data)));
       });
    }
}
