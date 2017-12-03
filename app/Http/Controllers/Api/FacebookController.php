<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FacebookController extends Controller
{
   public function getTest(){
      return response()->json('testJOnguh', 200);;
   }
}
