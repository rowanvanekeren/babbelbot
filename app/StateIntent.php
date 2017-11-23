<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StateIntent extends Model
{
    protected $table = 'state_intents';

    protected $fillable = [
        'state_id', 'intent', 'action','type', 'active'
    ];


    public function states() {
        return $this->belongsTo( 'App\States');
    }

    public function stateIntentAnswers() {
        return $this->hasMany( 'App\StateIntentAnswer' , 'state_intents_id');
    }

    public function stateIntentData() {
        return $this->hasOne( 'App\StateIntentData', 'state_intents_id' );
    }
}
