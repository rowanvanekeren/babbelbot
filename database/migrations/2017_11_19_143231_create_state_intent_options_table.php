<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStateIntentOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('state_intent_options', function (Blueprint $table) {
            $table->increments('id');
            $table->string('option');
            $table->tinyInteger('active')->default(1);
            $table->dateTime('called_at');
            $table->timestamps();
            $table->integer('state_intents_id')->unsigned()->nullable();
            $table->foreign('state_intents_id')->references('id')->on('state_intents');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('state_intent_options');
    }
}
