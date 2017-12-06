<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dialogue extends Model
{
    protected $table = 'dialogues';

    protected $fillable = [
        'title', 'description', 'app_id','active'
    ];


    public function apps() {
        return $this->belongsToMany( 'App\App');
    }

    public function states() {
        return $this->hasMany( 'App\State' );
    }

    public function startState(){
        return $this->hasOne( 'App\State' )->where('start_state' , 1)->with('stateIntents');
    }

}
