<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\User;
use App\SocialFacebookAccount;
use Auth;

class UserController extends Controller
{
    public function update(Request $request){
        $this->validate($request,[
            'name' => 'required|max:255',
        ]);

        $user = Auth::user();

        $user->name = $request->name;
        $user->save();

        return $user;
    }

    public function delete(Request $request){
        $user = Auth::user();

        $socialAccount = SocialFacebookAccount::where('user_id', $user->id)->first();



        Auth::logout();

        if(isset($socialAccount)){
            $socialAccount->delete();
        }

        if ($user->delete()) {

            return array('Je account is succesvol verwijderd');
        }
    }
}
