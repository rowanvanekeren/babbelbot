<?php

namespace App\Http\Controllers\Api;

use App\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Session;
use Cache;
use Carbon\Carbon;
class FacebookController extends Controller
{
   public function verifyFacebook($id, Request $request){

      $app = App::where('unique_id', $id)->first();
      $verify_token = "babbelbot_account_chatbot_preview";

      if ($request->input("hub_mode") === "subscribe"
          && $request->input("hub_verify_token") === $app->fb_verify_token) {
         return response($request->input("hub_challenge"), 200);
      }

      return response()->json($request, 200);
   }


   public function uniqueSession($uniqueID){

       $currentSession = Session::get($uniqueID);
        if(!isset($currentSession)){
            Session::put($uniqueID, 'new session');
            return Session::get($uniqueID);
        }else if(isset($currentSession)){
            Session::put($uniqueID, 'aleady has session session');
            return Session::get($uniqueID);
        }


   }
   public function responseFacebook($id, Request $request){
       bot_log('ik kom binnen');
       /* facebook return */
       $data = $request->all();

       /*get the user’s id */
       $fbuser_id = $data["entry"][0]["messaging"][0]["sender"]["id"];
       $cache_id = $fbuser_id .'_'. $id;

       /* do conversation */
       $text = $data["entry"][0]["messaging"][0]["message"]["text"];

       $cacheObj = getOrInitCache($cache_id, $id, 'facebook');


       if(isset($cacheObj['app'])){
           $fb_access_token = $cacheObj['app']['fb_access_token'];
       }else{
           return ;
       }
       bot_log($cacheObj['app']);

       $this->typingOn($fb_access_token, $fbuser_id);

       handleRequest($cache_id, $id, $text , 'facebook', function($data) use ($cache_id, $id,$text, $fbuser_id, $fb_access_token){
           bot_log('ik kom tot hier2');
            $answers  =  processRequest($cache_id,$id,$text , 'facebook', $data);
           bot_log($answers);
            $this->sendResponse($fb_access_token, $fbuser_id, $answers['answers'][0]['answer'], isset($answers['quick_replies']) ? $answers['quick_replies'] : null);

       });



     // return response()->json($backtoUser, 200);
   }

   private function typingOn($fb_access_token, $recipientId){

      $access_token = $fb_access_token;
     // $access_token = "EAABvn3DtMZAMBADU76lghPDgoW2lCYPUOGcWZAX1ypvNJ8Nfm43Rh5jZC23KBJmbHQc6iZCROcJRsDt8C7AfkVyukFKpLIn6cukPj2zZBwKHFROArIZB3SRTcZCLHeR5Y6zMnmRV4qAzY4EPHBZB0LBPvAz3L6zZC9LuZBL4f6119bc0VjaJznHrKx";

      $messageData = [
          "recipient" => [
              "id" => $recipientId
          ],
          "sender_action" => 'typing_on'
      ];

      $ch = curl_init('https://graph.facebook.com/v2.6/me/messages?access_token=' . $access_token);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_HEADER, false);
      curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($messageData));
      curl_exec($ch);
      curl_close($ch);
   }

   private function sendResponse($fb_access_token, $recipientId, $messageText = null, $quickReplies = null)
   {
     $access_token = $fb_access_token;
    //  $access_token = "EAABvn3DtMZAMBADU76lghPDgoW2lCYPUOGcWZAX1ypvNJ8Nfm43Rh5jZC23KBJmbHQc6iZCROcJRsDt8C7AfkVyukFKpLIn6cukPj2zZBwKHFROArIZB3SRTcZCLHeR5Y6zMnmRV4qAzY4EPHBZB0LBPvAz3L6zZC9LuZBL4f6119bc0VjaJznHrKx";

      $messageData = [
          "recipient" => [
              "id" => $recipientId
          ],
          "message" => $this->renderMessageData($messageText, $quickReplies)
      ];
      $ch = curl_init('https://graph.facebook.com/v2.6/me/messages?access_token=' . $access_token);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_HEADER, false);
      curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($messageData));
      $response = curl_exec($ch);
     bot_log($response);
      curl_close($ch);

   }

    private function renderMessageData($messageText = null, $quickReplies = null){

        $messageData = array();
        if(isset($quickReplies) && !empty($quickReplies) && count($quickReplies) >= 1){
            $quickRepliesReturn = array();
            foreach($quickReplies as $key => $value){
                array_push($quickRepliesReturn, array('content_type' => 'text', 'title' => $value['answer'], 'payload' => $value['answer'] ));
            }
            if(isset($messageText)){
                $messageData['text'] = $messageText;
            }else{
                $messageData['text'] = 'Kies een optie';
            }
            $messageData['quick_replies'] = $quickRepliesReturn;

            return $messageData;
        }else if(isset($messageText)){
            $messageData['text'] = $messageText;
            return $messageData;
        }else{
            $messageData['text'] = 'error';
            return $messageData;
        }
    }
}
