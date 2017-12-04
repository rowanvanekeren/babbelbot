<?php

namespace App\Http\Controllers;

use App\Intent;
use Illuminate\Http\Request;
use Validator;
use App\Dialogue;

class DialogueController extends Controller
{
    public function create(Request $request){
        $this->validate($request,[
            'title' => 'required|max:255',
            'description' => 'required'
        ]);

        $app_id = $request->session()->get('active_app')->id;

        $dialogue = new Dialogue();
        $dialogue->title = $request->title;
        $dialogue->description = $request->description;
        $dialogue->app_id = $app_id;
        $dialogue->active = 1;

        $dialogue->save();

        return $dialogue;
    }

    public function getDialogues(Request $request){
        $amountOnPage = 10;

        $app_id = $request->session()->get('active_app')->id;

        $dialogues = Dialogue::where('app_id', $app_id)->orderBy('created_at', 'desc')->paginate($amountOnPage);

        return $dialogues;
    }

    public function update(Request $request){
        $validationData = [];

        if(array_key_exists('description', $request->input())){
            $validationData = [ 'description' => 'sometimes|required', 'id' => 'required'];
        }else if(array_key_exists('title', $request->input())){
            $validationData = ['title' => 'required|max:255|unique:apps,title,'. $request->id ,'id' => 'required'];
        }

        $this->validate($request,$validationData);

        Dialogue::where('id', $request->id)->update(array_except($request->input(),['id']));

        return $request;
    }

    public function delete(Request $request){
        $this->validate($request,[
            'id' => 'required'
        ]);




        $dialogue = Dialogue::where('id', $request->id);

        $dialogue->delete();

        return $request;
    }

    public function select(Request $request){


        $dialogue = Dialogue::where('id', $request->id)->first();

        $request->session()->put('active_dialogue', $dialogue);

        return  $request->session()->get('active_dialogue');
    }
}
