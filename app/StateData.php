<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StateData extends Model
{
    protected $table = 'state_data';

    protected $fillable = [
        'state_id', 'link_data', 'name','active'
    ];


    public function states() {
        return $this->belongsTo( 'App\States');
    }

}
