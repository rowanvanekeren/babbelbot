<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    protected $table = 'states';

    protected $fillable = [
        'dialogue_id', 'next_states', 'start_state','active'
    ];


    public function dialogues() {
        return $this->belongsToMany( 'App\Dialogues');
    }

    public function stateIntents() {
        return $this->hasOne( 'App\StateIntent' , 'state_id');
    }

    public function stateData() {
        return $this->hasOne( 'App\StateData' , 'state_id');
    }
}
