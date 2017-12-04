<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IntentData extends Model
{
    protected $table = 'intent_data';

    protected $fillable = [
        'name', 'intent_id','active'
    ];


    public function intents() {
        return $this->belongsToMany( 'App\Intent');
    }
}
